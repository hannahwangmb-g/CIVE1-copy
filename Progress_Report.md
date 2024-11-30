WORK&MEETING LOG

### Oct.21 Mon Meeting
1. Set up my working hour schedule  
2. Regular meeting every week at Friday 5 pm  
3. Initial training topic decided: Erosion  
follow-up emails:  
1. Clarified the cost of training and future usage  
2. Clarified training dataset format  

### Week1(Oct.23-25) Work Log  
1. Set up platform account, project, organization  
2. Set up API connecting  
3. Data validation code  

#### Plan for next week  
1. Keep testing on the process, finish basic code setting up  


### Week2(Oct.28-Nov.1) Work log  
1. Explored the fine-tuning feature, and ensured the method was feasible  
2. Set up all basic code for model training  
3. Got a couple of training tests done, ensured the whole process can be successfully proceed  
4. Unfortunately the simple solution I mentioned at the beginning——fine-tuning, doesn't seem good for learning new knowledge but is more suitable for style/format/tone training  
5. Researched the further solution, the current answer would be embeddings/RAG  
#### Thoughts on fine-tuning data  
- Start by focusing on more general, highly reusable knowledge, templates, and styles.   
	For example:   
	- citation/reference style formatting  

- Save specific, low-reusability knowledge for future exploration with RAG (Retrieval-Augmented Generation) methods.  

#### Thoughts on third-party tools  
- Start with basic calculation, functions which could be done through Python/third-party libraries  

#### Plan for next week  
**1. Research on solutions: RAG, fine-tuning, function calling, structured output, Assistant API**  
2. Research on what makes a good training data  
3. Start preparing the training data on the erosion topic   
4. Try embeddings/RAG, hopefully, finish the first embedding model training on erosion topic this week  
5. Try function calling, with basic calculation functions  
6. Research on graph plot(matplotlab?)  

#### Nov.1 Fri Meeting
1. Save memory from chat history to train data(share with yourself/others). (keyword to let the model call function to save new training data/knowledge database)  
2. Sketch drawing  
3. Data formatting  

#### Note on RAG
- Retrieval-Augmented Generation, or RAG, is a technique that combines two essential methods—**retrieval** and **generation**—to create highly accurate and context-aware responses. The goal of RAG is to help AI systems, such as GPT models, deliver responses that are better informed and based on real-world knowledge.

	Here's how it works:

	- **Retrieval**: The system starts by searching through a knowledge base to find pieces of content that relate closely to the user’s question or prompt. This knowledge base can include documents, FAQs, articles, or databases—basically, any source of reliable information after rearranging it into smaller pieces.

	- **Augmentation with Retrieved Knowledge**: Once the system retrieves relevant information, it pairs this content with the original question or prompt as new input, this new input is then provided to the AI model (like GPT) to guide the response, so the AI has clear, factual knowledge to refer to when generating an answer.

	- **Generation**: With both the user’s question and the context from the knowledge base, the AI generates a response that is more accurate and relevant to the question.

- RAG Combined Fine-Tuning Integrating Process:
	1. **Fine-Tune GPT**: Train GPT with domain-specific datasets (e.g., fine-tuning it on geotechnical engineering texts) to improve its foundational understanding of more general, highly reusable knowledge, format, style, etc.
	2. **Embed Knowledge Base**: Rearrange documents into smaller pieces, and convert each piece into a “vector” (a unique numerical representation of the content). This helps the system quickly find information related to any given question.
	3. **Retrieve and Augment**: When a query is received, retrieve the top relevant documents from the knowledge base and augment the query with this information before sending it to the fine-tuned GPT model.



### Week3(Nov.4-Nov.8) Work log  
1. Working on RAG solution

#### Plan for next week
1. Keep working on the RAG solution
2. Explore Function Calling

### Week4(Nov.11-Nov.15) Work log
1. Explored on Assistant API
2. Explored on the RAG solution

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

**Conclusion**: The research phase is now complete, we'll transit into development now.

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
- Use the OpenAI Platform to fine-tune the model and generate a new model ID.  

4. Team Usage and Deployment:  

	- Each team member sets up and runs the Web application locally on a personal computer by setting up their own API Keys, enabling interaction with the Assistant through the web application interface.  
	- Provide a user guide for team members to configure and use the app seamlessly.  

5. Maintenance and Updates:   

	- Regularly update the knowledge base via the Assistant API or by re-fine-tuning the model when domain knowledge evolves.  
	- Update or add new functions in the back-end to enhance the Assistant’s capabilities.  
	- Monitor API usage and team activity through the OpenAI Platform to optimize costs and ensure smooth operation.  


### Timeline
#### Next 3 Weeks (before the final exam period)  
1. Complete the initial development of our web application.  
2. Integrating its key features——knowledge base, fine-tuning, and function calling.  
3. By the end of this phase, we should have a simple web app that has all the features and demonstrates the overall workflow of the system.

#### Winter Break (after the final exam period)
1. Expand, refine and finalize the remaining part of the project.


#### Meeting Note (Nov.15)
1. Set up a function for users to upload memory through the web app interface, verify by API Keys(?).
	- After research, Openai does not offer the memory function to API currently.
	- User ask GPT to summarize the memory, then manually upload it through an interface, the back-end API will upload it to the retrieval document base.
	- For memory management, explore how the threads work, how much will it cost if we use the thread for memory, whether we should use a database to store it, and whether a local database is fine for this storage. (SQLite)
2. Investigate how ChatGPT uses chat history as memories for future conversations.
3. Develop a complete workflow for geotechnical recommendation consulting. Further details on workflow, data format, and software are needed.
4. Explore deployment strategies for future customers.
5. Research standard development processes to determine whether tools like Docker, Figma, etc., are necessary.



### Week5(Nov.18-Nov.22) Work log
1. Built the basic interface of the web app.  
2. Conducted an initial deployment on Vercel (https://cive-1.vercel.app/).  

#### Information needed
1. Data and processes for the report generation workflow.

#### Meeting Note (Nov.22)
1. A sample CPT_tool Python program and CPT_footing spreadsheet will be provided for initial exploration of the function-calling workflow.

#### Plan for next week  
1. Refine the web app interface, including the reference display.  
2. Organize and expand the knowledge base.  
3. Explore conversation history storage and determine a database solution. (Optional Function)  
4. Ensure each new conversation starts a new thread.  
	- (Note: Instruct users to create a new conversation when message history is not needed for reference to avoid reaching the daily token limit.)  

#### Thoughts on Multiple Assistants for Different Usages
- Investigate whether separating assistants by use case reduces token costs, document retrieval costs, and processing speed.  
	1. Citation help  
	2. Consultant  
	3. Geotechnical Knowledge(might separate into various topics)  


#### Notes on Interface Design
1. Replace the weather and document widgets with reference and memory submission window.
2. Add a conversation history sidebar.
3. Add a footer, including displaying the number of tokens used for each message, and working status (retrieving document, etc.)
4. Add a start page for users to enter their API key. (Users must be added as members of the CIVE1 project on the platform.)
   - Alternatively, guide user to set their API key through code.


#### Notes on Database (User Conversation History Storage)
MongoDB vs. SQLite  

MangoDB: Free cloud storage up to 500MB.   
(We can limit the storage up to like 7 days, set up a limitation for each user, and send warnings when storage reaches 80-90%)  

SQLite: Free local storage.   
(Investigate the install process)  


#### Notes on Conversation Memory
- Determine whether the Assistant API can continue old conversations based on different thread IDs.
- Do we need to send conversation messages from the database, or does it already retain this information?


#### Note on User Memory Storage
- Learn how the custom GPT models are trained by users and update themselves, and how can user update the model. Either by fine-tuning or storing it in the database or updating the system instruction with this new instruction message.
- Current Solution: Investigate if we can update the system instruction based on user input.
	- Workflow: 
		1. The user clicks the "Save this memory as future system instruction" button.
		2. The model will summarize the conversation memory as a system instruction.
		3. The model returns the summarized memory to the side widget and sends a message to tell the user the memory is summarized, please check if it is the correct memory the user wants to save for future system instruction.
		4. The user can update the instruction in the widget, and click save to send it to the administrator for approval.
		5. After the administrator approves, it will be added to the system instruction.
(The system instruction has a maximum length of 256,000 characters.)


### Week6(Nov.25-29) Work log
1. Explored the CPT_tool.
2. Explored function calling. Current conclusion: it may be overly complex. Considering an alternative approach, such as automating the workflow with a Python program first, while leaving the possibility of AI model integration for future exploration.

#### Plan for next week
1. Convert spreadsheets into Python programs:
	- CPT_footing.xlsx
	- CPT_lcpc.xlsx
2. Continue exploring function calling.
3. Organize articles in Teams and integrate them into the knowledge base.


#### Nov.29 Meeting Note
1. Overall description of our project(Slides by noon Dec.2nd)
   - Functionalities
   - Approach/Methodology
2. Ollama
3. ~92MB to 4MB Vector Data.
4. Database for conversation history.
