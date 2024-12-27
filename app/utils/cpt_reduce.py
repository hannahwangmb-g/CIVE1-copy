import os
import pandas as pd
import re
import numpy as np

# Specify the directory path containing CPT files
cpt_directory = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'cpt_based_tool', 'files')

# Create a dictionary to store the paths of all .CPT files
file_paths = {}
for filename in os.listdir(cpt_directory):
    if filename.endswith('.CPT'):  # Only process files with .CPT extension
        file_paths[filename] = os.path.join(cpt_directory, filename)

# Reading each file assuming they are in a fixed-width format 
uploaded_data_frames = {}
for name, path in file_paths.items():
    try:
        # Trying to load as a tab or space-separated file
        uploaded_data_frames[name] = pd.read_csv(path, sep=r'\s+', on_bad_lines='skip')
    except Exception:
        # If the above fails, trying comma separation as a fallback
        uploaded_data_frames[name] = pd.read_csv(path, sep=",", on_bad_lines='skip')


# Reducing data by selecting relevant columns and formatting them similarly to the previous procedure
def reduce_cpt_data(df):
    # Remove first two rows
    df = df.iloc[2:].reset_index(drop=True)

    # Extract the required columns (D, QC, FS, U)
    def extract_values(row):
        data = row["$"] if "$" in row else ""
        D = re.search(r"D=(-?[\d\.]+)", data)
        QC = re.search(r"QC=(-?[\d\.]+)", data)
        FS = re.search(r"FS=(-?[\d\.]+)", data)
        U = re.search(r"U=(-?[\d\.]+)", data)

        return {
            "Z (m)": float(D.group(1)) if D else None,
            "qc (MPa)": float(QC.group(1)) if QC else None,
            "fs (kPa)": float(FS.group(1)) if FS else None,
            "u2 (kPa)": float(U.group(1)) if U else None
        }
    
    # Apply extraction
    processed_df = df.apply(extract_values, axis=1, result_type="expand")

    return processed_df

# Process each sheet
reduced_data_frames = {name: reduce_cpt_data(df) for name, df in uploaded_data_frames.items()}

# Load the Excel file containing CPT file names and gwl values
gwl_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'cpt_based_tool', 'files', 'gwl.xlsx')
if not os.path.exists(gwl_file_path):
    raise FileNotFoundError("gwl.xlsx not found. Please ensure it is placed in files/ directory.")

gwl_data = pd.read_excel(gwl_file_path)

# Create a dictionary with file names as keys and gwl values as values
gwl_dict = dict(zip(gwl_data.iloc[:, 0], gwl_data.iloc[:, 1]))
# Add gwl values to reduced_data_frames
for name, df in reduced_data_frames.items():
    if name in gwl_dict:
        df['gwl (m)'] = gwl_dict[name]
    else:
        df['gwl (m)'] = np.nan  # or any default value you prefer
    fs = df["fs (kPa)"].values
    u2 = df["u2 (kPa)"].values
    gwl_value = df["gwl (m)"].values[0]  # Use the first value of gwl for the entire column
    z = df["Z (m)"].values
    qc = df["qc (MPa)"].values
    
    # Assumed values
    soil_uw = 18  # soil unit weight, kN/m3
    a_n=0.8 # cone area ratio

    # Calculations
    u0 = []  # Hydrostatic water pressure
    for depth in z:
        if depth < gwl_value:
            u0.append(0)
        else:
            u0.append((depth - gwl_value) * 10)

    fs_corrected = np.abs(fs)  # correct fs values to be positive
    fs_corrected[fs_corrected == 0] = 1  # Replace 0 values with 0.01 to avoid division by zero
    sig_vo = z * soil_uw  # Total Vertical Stress
    sig1_vo = sig_vo - u0  # Effective Vertical Stress
    qt=qc*1000+u2*(1-a_n) # qt kPa
    np.seterr(divide='ignore')  # Ignore math errors
    Qt=(qt-sig_vo)/sig1_vo # Normalised qc
    FR=fs_corrected/(qt-sig_vo)*100 # Friction Ratio, in percetage
    Rf=(fs_corrected/qc/1000)*100 # Friction Ratio
    Bq= u2/(qt-sig_vo) # Pore pressure ratio
    Ic = np.sqrt(np.power((3.47 - np.log10(Qt)), 2) + np.power((np.log10(FR) + 1.22), 2))  # Soil Behaviour Type Index

    # Add calculated values to the DataFrame
    reduced_data_frames[name]['fs_corrected (kPa)'] = fs_corrected
    reduced_data_frames[name]['qt (MPa)'] = qt / 1000  # qt MPa
    reduced_data_frames[name]['gw (m)'] = gwl_value
    reduced_data_frames[name]['u0 (kPa)'] = u0
    reduced_data_frames[name]['sig_vo (kPa)'] = sig_vo
    reduced_data_frames[name]['sig1_vo (kPa)'] = sig1_vo
    reduced_data_frames[name]['Rf (%)'] = Rf 
    reduced_data_frames[name]['Bq'] = Bq 
    reduced_data_frames[name]['Qt'] = Qt
    reduced_data_frames[name]['FR'] = FR
    reduced_data_frames[name]['Ic'] = Ic
    # Filter out rows with NaN or Inf values in Rf
    valid_indices = np.isfinite(reduced_data_frames[name]['Rf (%)'])
    z = z[valid_indices]
    qc = qc[valid_indices]
    fs = fs[valid_indices]
    u2 = u2[valid_indices]
    u0 = np.array(u0)[valid_indices]
    Rf = Rf[valid_indices]
    Bq = Bq[valid_indices]
    Ic = Ic[valid_indices]

    # Save the reduced data to a new Excel file
    # Ensure the output directory exists
    output_directory = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'cpt_based_tool', 'gpt')
    os.makedirs(output_directory, exist_ok=True)

    # Create a separate Excel file for each processed CPT data
    for name, processed_df in reduced_data_frames.items():
        # Extract the base name from the original file name (excluding the extension)
        base_name = os.path.splitext(name)[0]
        # Create the output file path
        output_path = os.path.join(output_directory, f"reduced_{base_name}.xlsx")
        
        # Save to Excel
        processed_df.to_excel(output_path, index=False)
        print(f"Saved reduced data for {name} to {output_path}")

# main
print("Data reduction completed. The reduced data is saved to reduced_data.xlsx.")