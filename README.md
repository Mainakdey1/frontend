# AIcoach (React + FastAPI)

This is a react application that is made on reactjs platform and leverages streamchat.io . This application leverages GeminiAI to generate answer prompts from user prompts and stores that data via it's postgres database. Then it utilizes that experience to remember data for the user and generates future prompts. It sounds simple and that's generally what I aim to provide users. Simple.
This and its backend counter part is hosted on render.io(it was cheap :D)

This is the memory implementation architecture for the app:
![memory_implementation](https://github.com/user-attachments/assets/2ccaa2a6-3351-4ba4-b8c8-d55acd388b21)

Most of the implementation is through the python backend. I chose a sql server because it was faster and the application was quite write-heavy.
Why did I use two databases? These are the reasons:

1. Databases: We can use any SQL based database here, such as Postgres or mysql. Of course nosql
databases can be used too, where they could be a positive since they are good for high volume
writes and RealT ime apps. Relevant information based on user queries can be extracted and injected
into the context. This data can then be re extracted later and injected into the LLM prompt
dynamically, while it parses the current query.
2. Vector Database(Pinecon
e): We could store embeddings from the past conversations here
and when a new query comes in, retrieve relevant past conversations based on similarity. There is a
possibility of having interleaved data retrieval from both relational databases and vector da tabase,
and to have a more performant data retrieval system by having distance based comparison between
keywords from the two systems.

