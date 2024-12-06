const cptReduce = async (inputData: string): Promise<string> => {
    const response = await fetch('/api/reduce_cpt_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to reduce CPT data: ${errorData.error}`);
    }
  
    const data = await response.json();
    return data.result;
  };
  
  export { cptReduce };