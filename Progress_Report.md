WORK&MEETING LOG

### Oct.21 Mon Meeting
1. Set up my working hour schedule  
2. Regular meeting every week at Friday 5pm  
3. Initial training topic decided: Erosion  
follow-up emails:  
1. Clarified the cost of training and future usage  
2. Clarified training dataset format  

### Week1(Oct.23-25) Work Log  
1. Set up platform accout, project, organization  
2. Set up API connecting  
3. Data validation code  

#### Plan for next week  
1. Keep testing on the process, finish basic code setting up  


### Week2(Oct.28-Nov.1) Work log  
1. Explored the fine-tuning feature, ensured the method is feasible  
2. Set up all basic code for model training  
3. Got a couple of training tests done, ensured the whole process can be successfully proceed  
4. Unfortunately the simple solution I mentioned at the beginning——fine-tuning, doesn't seems good for learning new knowledges but more suitable for style/format/tone training  
5. Researched on further solution, current answer would be embeddings/RAG  
#### Thoughts on fine-tuning data  
- Start by focusing on more general, highly reusable knowledge, templates, and styles.   
	For example:   
	- citation/reference style formatting  

- Save specific, low-reusability knowledge for future exploration with RAG (Retrieval-Augmented Generation) methods.  

#### Thoughts on third-party tools  
- Start with basic calculation, functions which could be done through python/third-party libraries  

#### Plan for next week  
**1. Research on solutions: RAG, fine-tuning, function calling, structured output, Assistant API**  
2. Research on what makes a good training data  
3. Start preparing the training data on erosion topic   
4. Try embeddings/RAG, hopefully finish first embedding model training on erosion topic this week  
5. Try function calling, with basic calculation functions  
6. Research on graph plot(matplotlab?)  

#### Nov.1 Fri Meeting
1. Save memory from chat history to train data(share with yourself/others). (key word to let the model call function to save new training data/knowledge database)  
2. Sketch drawing  
3. Data formatting  

#### Note on RAG
- Retrieval-Augmented Generation, or RAG, is a technique that combines two essential methods—**retrieval** and **generation**—to create highly accurate and context-aware responses. The goal of RAG is to help AI systems, such as GPT models, deliver responses that are better informed and based on real-world knowledge.

	Here's how it works:

	- **Retrieval**: The system starts by searching through a knowledge base to find pieces of content that relate closely to the user’s question or prompt. This knowledge base can include documents, FAQs, articles, or databases—basically, any source of reliable information after rearrange into smaller pieces.

	- **Augmentation with Retrieved Knowledge**: Once the system retrieves relevant information, it pairs this content with the original question or prompt as new input, this new input is then provided to the AI model (like GPT) to guide the response, so the AI has clear, factual knowledge to refer to when generating an answer.

	- **Generation**: With both the user’s question and the context from the knowledge base, the AI generates a response that is more accurate and relevant to the question.

- RAG Combined Fine-Tuning Integrating Process:
	1. **Fine-Tune GPT**: Train GPT with domain-specific datasets (e.g., fine-tuning it on geotechnical engineering texts) to improve its foundational understanding on more general, highly reusable knowledge, format, style, etc.
	2. **Embed Knowledge Base**: Rearrange documents into smaller pieces, convert each piece into a “vector” (a unique numerical representation of the content). This helps the system quickly find information related to any given question.
	3. **Retrieve and Augment**: When a query is received, retrieve the top relevant documents from the knowledge base and augment the query with this information before sending it to the fine-tuned GPT model.



### Week3(Nov.4-Nov.8) Work log  
1. Working on RAG solution

#### Plan for next week
1. Keep working on RAG solution
2. Explore Function Calling

### Week4(Nov.11-Nov.15) Work log
1. Explored on Assistant API
2. Explored on RAG solution

#### Notes on Current exploration of solutions
Original RAG Solution:  
- High development complexity, requiring additional integration of knowledge base, search, and generation models.  
- Requires extra embedding models and a custom database; if used locally, each member needs a local database, or cloud hosting at an additional cost.  
- Updating the knowledge base is complex, requiring skilled personnel for maintenance.  


New Solution: **Assistant API**    
The Assistant API is a new beta feature from OpenAI that enables developers to build intelligent assistants capable of retrieving and generating responses based on user queries. It combines OpenAI’s language model capabilities with features like embeddings and function calling, which allow for enhanced interactions without the need for external database or retrieval system integration. This API simplifies both development and maintenance, making it accessible for teams with minimal technical setup and easy knowledge base updates.  
- Low development complexity.    
- Embedding and storage are directly provided by OpenAI, eliminating the need to build an external database or retrieval system.     
*Pricing: [File Search： $0.10 / GB of vector-storage per day (1 GB free)]*.    
- Updating the knowledge base is simple and does not require specialized personnel, making it easy to manage.  

#### Notes on Assistant API   
Development Plan:    

1. Build a Simple Web App:  

- Develop a basic front-end interface with a chat window for user interaction.  
- Integrate the Assistant API into the back-end to handle user queries and responses.  

2. Implement Function Calling:  

- Define and implement functions to enable the Assistant to perform specific tasks, such as querying databases, accessing external APIs, or executing calculations.  
- Configure the Assistant API to recognize and call these functions based on user input.  

3. Fine-Tune the Model:  

- Prepare domain-specific datasets in JSONL format to train the Assistant for specialized knowledge or response styles/format.  
- Use OpenAI Platform to fine-tune the model and generate a new model ID.  

4. Team Usage and Deployment:  

- Each team member sets up and runs the Web application locally on personal computer by setting up their individual API Keys, enabling interaction with the Assistant through the web application interface.  
- Provide a user guide for team members to configure and use the app seamlessly.  

5. Maintenance and Updates:   

- Regularly update the knowledge base via the Assistant API or by re-fine-tuning the model when domain knowledge evolves.  
- Update or add new functions in the back-end to enhance the Assistant’s capabilities.  
- Monitor API usage and team activity through OpenAI Platform to optimize costs and ensure smooth operation.  