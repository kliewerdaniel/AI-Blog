---
layout: home
title:  Ollama Smolagents Open Deep Research Integration
date:   2025-02-05 09:42:44 -0500
---
# Understanding the Code: An In-Depth Analysis of Building a SmolAgent with Ollama and External Tools

In this blog post, we’ll take an in-depth look at a piece of Python code that leverages multiple tools to build a sophisticated agent capable of interacting with users, conducting web searches, generating images, and processing messages using an advanced language model powered by Ollama.

The code integrates smolagents, ollama, and a couple of external tools like DuckDuckGo search and text-to-image generation, providing us with a very flexible and powerful way to interact with AI. Let’s break down the code and understand how it all works.

# What is smolagents?

Before we dive into the code, it’s important to understand what the smolagents package is. smolagents is a lightweight framework that allows you to create “agents” — these are entities that can perform tasks using various tools, plan actions, and execute them intelligently. It’s designed to be easy to use and flexible, offering a range of capabilities that can be extended with custom models, tools, and interaction logic.

The main components we’ll work with in this code are:

	•	CodeAgent: A specialized type of agent that can execute code.

	•	DuckDuckGoSearchTool: A tool to search the web using DuckDuckGo.
    
	•	load_tool: A utility function to load external tools dynamically.

Now, let’s explore the code!

Importing Libraries and Setting Up the Environment

```python
from smolagents import load_tool, CodeAgent, DuckDuckGoSearchTool
from dotenv import load_dotenv
import ollama
from dataclasses import dataclass

# Load environment variables
load_dotenv()
```

The code starts by importing necessary libraries. Here’s what each one does:

	•	load_tool, CodeAgent, DuckDuckGoSearchTool are imported from the smolagents library. These will be used to load external tools, create the agent, and facilitate web searches.

	•	load_dotenv is from the dotenv package. This is used to load environment variables from a .env file, which is often used to store sensitive information like API keys or configuration values.

	•	ollama is a library to interact with Ollama’s language model API, which will be used to process and generate text.

	•	dataclass is from the dataclasses module, which simplifies the creation of classes that are primarily used to store data.

The call to load_dotenv() loads environment variables from a .env file, which could contain configuration details like API keys. This ensures that sensitive information is not hard-coded into the script.

The Message Class: Defining the Message Format

```python
@dataclass
class Message:
    content: str  # Required attribute for smolagents
```

Here, a Message class is defined using the dataclass decorator. This simple class has one field: content. The purpose of this class is to encapsulate the content of a message sent or received by the agent. By using the dataclass decorator, we simplify the creation of this class without having to write boilerplate code for methods like __init__.

The OllamaModel Class: A Custom Wrapper for Ollama API

```python
class OllamaModel:
    def __init__(self, model_name):
        self.model_name = model_name
        self.client = ollama.Client()

    def __call__(self, messages, **kwargs):
        formatted_messages = []
        
        # Ensure messages are correctly formatted
        for msg in messages:
            if isinstance(msg, str):
                formatted_messages.append({
                    "role": "user",  # Default to 'user' for plain strings
                    "content": msg
                })
            elif isinstance(msg, dict):
                role = msg.get("role", "user")
                content = msg.get("content", "")
                if isinstance(content, list):
                    content = " ".join(part.get("text", "") for part in content if isinstance(part, dict) and "text" in part)
                formatted_messages.append({
                    "role": role if role in ['user', 'assistant', 'system', 'tool'] else 'user',
                    "content": content
                })
            else:
                formatted_messages.append({
                    "role": "user",  # Default role for unexpected types
                    "content": str(msg)
                })

        response = self.client.chat(
            model=self.model_name,
            messages=formatted_messages,
            options={'temperature': 0.7, 'stream': False}
        )
        
        # Return a Message object with the 'content' attribute
        return Message(
            content=response.get("message", {}).get("content", "")
        )
```

The OllamaModel class is a custom wrapper around the ollama.Client to make it easier to interact with the Ollama API. It is initialized with a model name (e.g., mistral-small:24b-instruct-2501-q8_0) and uses the ollama.Client() to send requests to the Ollama language model.

The __call__ method is used to format the input messages appropriately before passing them to the Ollama API. It supports several types of input:

	•	Strings, which are assumed to be from the user.

	•	Dictionaries, which may contain a role and content. The role could be user, assistant, system, or tool.

	•	Other types are converted to strings and treated as messages from the user.

Once the messages are formatted, they are sent to the Ollama model using the chat() method, which returns a response. The content of the response is extracted and returned as a Message object.

Defining External Tools: Image Generation and Web Search

# Define tools

```python
image_generation_tool = load_tool("m-ric/text-to-image", trust_remote_code=True)
search_tool = DuckDuckGoSearchTool()
```

Two external tools are defined here:

	•	image_generation_tool is loaded using load_tool and refers to a tool capable of generating images from text. The tool is loaded with the trust_remote_code=True flag, meaning the code of the tool is trusted and can be executed.

	•	search_tool is an instance of DuckDuckGoSearchTool, which enables web searches via DuckDuckGo. This tool can be used by the agent to gather information from the web.

Creating the Agent

# Define the custom Ollama model

```python
ollama_model = OllamaModel("mistral-small:24b-instruct-2501-q8_0")

# Create the agent
agent = CodeAgent(
    tools=[search_tool, image_generation_tool],
    model=ollama_model,
    planning_interval=3
)
```

Here, we create an instance of OllamaModel with a specified model name (mistral-small:24b-instruct-2501-q8_0). This model will be used by the agent to generate responses.

Then, we create an instance of CodeAgent, passing in the list of tools (search_tool and image_generation_tool), the custom ollama_model, and a planning_interval of 3 (which determines how often the agent should plan its actions). The CodeAgent is a specialized agent designed to execute code, and it will use the provided tools and model to handle its tasks.

# Running the Agent

```python
# Run the agent
result = agent.run(
    "YOUR_PROMPT"
)
```

This line runs the agent with a specific prompt. The agent will use its tools and model to generate a response based on the prompt. The prompt could be anything — for example, asking the agent to perform a web search, generate an image, or provide a detailed answer to a question.

# Outputting the Result

```python
# Output the result
print(result)
```

Finally, the result of the agent’s execution is printed. This result could be a generated message, a link to a search result, or an image, depending on the agent’s response to the prompt.

# Conclusion

This code demonstrates how to build a sophisticated agent using the smolagents framework, Ollama’s language model, and external tools like DuckDuckGo search and image generation. The agent can process user input, plan its actions, and execute tasks like web searches and image generation, all while using a powerful language model to generate responses.

By combining these components, we can create intelligent agents capable of handling a wide range of tasks, making them useful for a variety of applications like virtual assistants, content generation, and research automation.


```python
from smolagents import load_tool, CodeAgent, DuckDuckGoSearchTool
from dotenv import load_dotenv
import ollama
from dataclasses import dataclass

# Load environment variables
load_dotenv()

@dataclass
class Message:
    content: str  # Required attribute for smolagents

class OllamaModel:
    def __init__(self, model_name):
        self.model_name = model_name
        self.client = ollama.Client()

    def __call__(self, messages, **kwargs):
        formatted_messages = []
        
        # Ensure messages are correctly formatted
        for msg in messages:
            if isinstance(msg, str):
                formatted_messages.append({
                    "role": "user",  # Default to 'user' for plain strings
                    "content": msg
                })
            elif isinstance(msg, dict):
                role = msg.get("role", "user")
                content = msg.get("content", "")
                if isinstance(content, list):
                    content = " ".join(part.get("text", "") for part in content if isinstance(part, dict) and "text" in part)
                formatted_messages.append({
                    "role": role if role in ['user', 'assistant', 'system', 'tool'] else 'user',
                    "content": content
                })
            else:
                formatted_messages.append({
                    "role": "user",  # Default role for unexpected types
                    "content": str(msg)
                })

        response = self.client.chat(
            model=self.model_name,
            messages=formatted_messages,
            options={'temperature': 0.7, 'stream': False}
        )
        
        # Return a Message object with the 'content' attribute
        return Message(
            content=response.get("message", {}).get("content", "")
        )

# Define tools
image_generation_tool = load_tool("m-ric/text-to-image", trust_remote_code=True)
search_tool = DuckDuckGoSearchTool()

# Define the custom Ollama model
ollama_model = OllamaModel("mistral-small:24b-instruct-2501-q8_0")

# Create the agent
agent = CodeAgent(
    tools=[search_tool, image_generation_tool],
    model=ollama_model,
    planning_interval=3
)

# Run the agent
result = agent.run(
    "YOUR_PROMPT"
)

# Output the result
print(result)
```