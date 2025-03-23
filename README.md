# AIcoach (React + FastAPI + Postgres + Pinecone )

This is a react application that is made on reactjs platform  . This application leverages GeminiAI to generate answer prompts from user prompts and stores that data via it's postgres database. Then it utilizes that experience to remember data for the user and generates future prompts. It sounds simple and that's generally what I aim to provide users. Simple.
This and its backend counter part is hosted on render.io(it was cheap :D)

This is the memory implementation architecture for the app:
![memory_implementation](https://github.com/user-attachments/assets/2ccaa2a6-3351-4ba4-b8c8-d55acd388b21)

The current look of the app:
<p>
  <img src="https://github.com/user-attachments/assets/aa75f18e-6264-4746-aec1-d62f7c872be1">


</p>


The application is mostly an attempt to combat memory issues in current LLMs where they are unable to retain infomation over multiple user sessions, and also data between sessions is not shared as much. To tackle this problem, I did 
Data Parsing (Parse Module/MRS):
Data from our API will be handled by MRS module so that the following can occur:
a. Summarization: Store summarized versions of long conversations to save space.
b. Relevance Filtering: Retrieve only relevant past interactions based on the current query.
c. Context Window Optimization: Keep track of token limits and inject only necessary memory.
We will use these strategies to keep performance of preprocessing data from our backend very high,
so that overall extraction speed from our databases are speedy.
Input data for our Data Storage System will be extracted directly from our parse module in our
FastAPI python backend, with no space wasted on additional processing. This data will then be
passed on to a micro formatter module which will process the data to be received by the Data
Storage System.
Data Storage System (Persistent Memory modules):
1. Databases: We can use any SQL based database here, such as Postgres or mysql. Of course nosql
databases can be used too, where they could be a positive since they are good for high volume
writes and RealTime apps. Relevant information based on user queries can be extracted and injected
into the context. This data can then be re-extracted later and injected into the LLM prompt
dynamically, while it parses the current query.
2. Vector Database(Think Pinecone): We could store embeddings from the past conversations here
and when a new query comes in, retrieve relevant past conversations based on similarity. There is a
possibility of having interleaved data retrieval from both relational databases and vector database,
and to have a more performant data retrieval system by having distance based comparison between
keywords from the two systems.
Data Retrieval System(Semantics only):
It is very necessary that redundant data is not processed and data is let out of our persistent memory
modules only when they match a high standard of accuracy. In order to accomplish this, a
comparator module will process the data coming out from queries made to the relational database
and the vector database, to make sure only matching dataset is retrieved. These results will be
reconstituted and made ready to be sent back to our API and consequently, the React application
