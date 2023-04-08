from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import LLMChain, HypotheticalDocumentEmbedder, RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Pinecone

import pinecone
from pinecone_helpers import INDEX


def use_HyDE(title=''):
    base_embeddings = OpenAIEmbeddings()
    llm = OpenAI()

    prompt_template = f"""Task: Give a 35 word youtube comment
    that exactly rewords the query's sentiments. It is important to write the type of 
    comments that actually occur. In this case the comments may be rude, or angry, 
    it also may be positive, supportive or neutral.
    Video title: {title}
    Query: {{query}}
    COMMENT:
    """

    # prompt_template = """Please answer the user's question about the most recent state of the union address
    # Question: {question}
    # Answer:"""
    prompt = PromptTemplate(input_variables=["query"], template=prompt_template)
    llm_chain = LLMChain(llm=llm, prompt=prompt)
    embeddings = HypotheticalDocumentEmbedder(llm_chain=llm_chain, base_embeddings=base_embeddings)
    return embeddings


def useQA_retriver(query, title):
    index = pinecone.Index(INDEX)

    embeddings = OpenAIEmbeddings()
    
    vectordb = Pinecone(
        index=index,
        embedding_function=embeddings.embed_query,
        text_key="text"
    )
    response = vectordb.similarity_search(query, k=5)
    print(response)

    llm = ChatOpenAI(
        temperature=0,
        model_name='gpt-3.5-turbo'
    )

    retriever = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectordb.as_retriever(),
        verbose=True
    )

    print(retriever.run(query))

