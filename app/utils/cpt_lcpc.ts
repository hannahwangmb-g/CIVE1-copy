const cptLcpc = async (inputData: string): Promise<string> => {
    const response = await fetch('/api/cpt_lcpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to LCPC CPT data: ${errorData.error}`);
    }
  
    const data = await response.json();
    return data.result;
  };
  
  export { cptLcpc };