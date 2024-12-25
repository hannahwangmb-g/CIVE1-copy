## WORK & MEETING LOG


### **Oct. 21 (Mon) kick-off Meeting**
1. Set up my working hour schedule.  
2. Regular meeting scheduled every Friday at 5 PM.  
3. Initial training topic decided: **Erosion**.  

#### Follow-Up Emails  
1. Clarified the cost of training and future usage.  
2. Clarified the training dataset format.  

---

### **Week 1 (Oct. 23–25) Work Log**  
1. Set up platform account, project, and organization.  
2. Set up API connection.  
3. Developed data validation code.  

#### Plan for Next Week  
1. Continue testing the process and finish setting up the basic code.  

---

### **Week 2 (Oct. 28–Nov. 1) Work Log**  
1. Explored the fine-tuning feature and ensured the method was feasible.  
2. Set up all basic code for model training.  
3. Completed a few training tests to confirm the process is successful.  
4. Discovered that fine-tuning is more suitable for style/format/tone training rather than learning new knowledge.  
5. Researched further solutions; current recommendation: **embeddings/RAG**.  

#### Thoughts on Fine-Tuning Data  
- Focus on general, highly reusable knowledge, templates, and styles (e.g., citation/reference formatting).  
- Reserve specific, low-reusability knowledge for future exploration with **RAG (Retrieval-Augmented Generation)**.  

#### Thoughts on Third-Party Tools  
- Start with basic calculations and functions that can be implemented via Python/third-party libraries.  

#### Plan for Next Week  
1. **Research solutions: RAG, fine-tuning, function calling, structured output, Assistant API.**  
2. Study what makes good training data.  
3. Begin preparing training data on the erosion topic.  
4. Experiment with embeddings/RAG and aim to finish the first embedding model training.  
5. Explore function calling with basic calculation functions.  
6. Research graph plotting (e.g., Matplotlib).  

### Nov. 1 (Fri) Meeting
1. Save memory from chat history into training data (shareable with yourself/others).  
   - Include a keyword to trigger the model to save data to a knowledge database.  
2. Add sketch-drawing functionality.  
3. Ensure proper data formatting.  

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
---

### **Week 3 (Nov. 4–8) Work Log**  
1. Focused on RAG solutions.  

#### Plan for Next Week  
1. Continue working on RAG solutions.  
2. Explore function calling.  

---

### **Week 4 (Nov. 11–15) Work Log**  
1. Explored the Assistant API.  
2. Continued working on RAG solutions.  

#### Notes on Current Exploration of Solutions  

##### **Original RAG Solution**  
- High development complexity (requires integration of knowledge base, search, and generation models).  
- Needs custom embedding models and databases. Local solutions require each member to maintain a database or opt for cloud hosting (additional cost).  
- Updating the knowledge base is complex and requires skilled personnel.  

##### **New Solution: Assistant API**  
- Low development complexity.  
- Embedding and storage provided by OpenAI (no need for external databases).  
- Pricing: File Search Vector Storage costs **$0.10/GB/day** (first 1 GB free).  
- Updating the knowledge base is simple and manageable without specialized skills.  

#### Development Plan: Assistant API  
1. Build a simple web app with a chat interface.  
2. Implement function calling for tasks like querying databases, accessing APIs, or calculations.  
3. Fine-tune the model with domain-specific data.  
4. Enable team-wide usage via local setups with API keys.  
5. Regularly update the knowledge base and functions.  

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

---

### **Week 5 (Nov. 18–22) Work Log**  
1. Built the basic web app interface.  
2. Deployed the initial version on Vercel: [CIVE-1](https://cive-1.vercel.app/).  

#### Information Needed  
1. Data and processes for the report generation workflow.  

#### Nov. 22 (Fri) Meeting Notes  
1. A sample CPT_tool Python program and CPT_footing spreadsheet were provided for initial exploration of function-calling workflows.  

#### Plan for Next Week  
1. Refine the web app interface, including reference display.  
2. Expand the knowledge base.  
3. Explore conversation history storage and database solutions (optional).  
4. Ensure new conversations start fresh threads to prevent token overuse.  

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
---

### **Week 6 (Nov. 25–29) Work Log**  
1. Explored the CPT_tool.  
2. Investigated function calling and considered simplifying workflows via Python automation.  

#### Plan for Next Week  
1. Continue exploring function calling.  
2. Organize reference articles in Teams and integrate them into the knowledge base.  

### **Nov. 29 (Fri) Meeting Notes**  
1. **Project Overview** (Slides due by **noon, Dec. 2**):  
   - **Functionalities**.  
   - **Approach/Methodology**.  
2. Discussed Ollama.  
3. Vector storage: ~5% of the original file size (~630MB to 31MB).  
4. Database for conversation history needed.  
5. Continue working on function calling.

---

### **Week 7 (Dec. 2–6) Work Log**  
1. Organized reference articles and integrated them into the knowledge base.  
2. Improved the starting page design.  
3. Enhanced the warning page with API key validation and user guidance.  
4. Successfully developed function calling with local file storage:  
   - Initial attempt using OpenAI's file storage failed due to unsupported file purposes for `.CPT` and `.xlsx` formats.  
   - Adopted local file storage as a solution, allowing the model to perform function calls by reading files from and storing files to local paths.  

#### Plan for Next Week  
- Pause work for two weeks due to final exams, as per the original schedule.  
- Will continue expanding, refining, and finalizing the remaining parts of the project after the final exam period, with a focus on implementing database storage for conversation history.

---

### **Week 8-9 **
- Paused.

#### Plan for Next Week
1. Implement conversation history retrieval.  
2. Implement save memory to instruction.  
---

### **Week 10 (Dec. 23-27) Work Log**
