import os
import json
import random
import datetime
import requests
import re

def get_random_post(posts_dir='_posts'):
    posts = [f for f in os.listdir(posts_dir) if f.endswith('.md')]
    if not posts:
        print("No posts found in _posts directory.")
        return None
    random_post = random.choice(posts)
    with open(os.path.join(posts_dir, random_post), 'r') as file:
        content = file.read()
    return content

def analyze_writing_sample(writing_sample):
    encoding_prompt = '''
Please analyze the writing style and personality of the given writing sample. Provide a detailed assessment of their characteristics using the following template. Rate each applicable characteristic on a scale of 1-10 where relevant, or provide a descriptive value. Store the results in a JSON format.

{{
  "name": "[Author/Character Name]",
  "vocabulary_complexity": [1-10],
  "sentence_structure": "[simple/complex/varied]",
  "paragraph_organization": "[structured/loose/stream-of-consciousness]",
  "idiom_usage": [1-10],
  "metaphor_frequency": [1-10],
  "simile_frequency": [1-10],
  "tone": "[formal/informal/academic/conversational/etc.]",
  "punctuation_style": "[minimal/heavy/unconventional]",
  "contraction_usage": [1-10],
  "pronoun_preference": "[first-person/third-person/etc.]",
  "passive_voice_frequency": [1-10],
  "rhetorical_question_usage": [1-10],
  "list_usage_tendency": [1-10],
  "personal_anecdote_inclusion": [1-10],
  "pop_culture_reference_frequency": [1-10],
  "technical_jargon_usage": [1-10],
  "parenthetical_aside_frequency": [1-10],
  "humor_sarcasm_usage": [1-10],
  "emotional_expressiveness": [1-10],
  "emphatic_device_usage": [1-10],
  "quotation_frequency": [1-10],
  "analogy_usage": [1-10],
  "sensory_detail_inclusion": [1-10],
  "onomatopoeia_usage": [1-10],
  "alliteration_frequency": [1-10],
  "word_length_preference": "[short/long/varied]",
  "foreign_phrase_usage": [1-10],
  "rhetorical_device_usage": [1-10],
  "statistical_data_usage": [1-10],
  "personal_opinion_inclusion": [1-10],
  "transition_usage": [1-10],
  "reader_question_frequency": [1-10],
  "imperative_sentence_usage": [1-10],
  "dialogue_inclusion": [1-10],
  "regional_dialect_usage": [1-10],
  "hedging_language_frequency": [1-10],
  "language_abstraction": "[concrete/abstract/mixed]",
  "personal_belief_inclusion": [1-10],
  "repetition_usage": [1-10],
  "subordinate_clause_frequency": [1-10],
  "verb_type_preference": "[active/stative/mixed]",
  "sensory_imagery_usage": [1-10],
  "symbolism_usage": [1-10],
  "digression_frequency": [1-10],
  "formality_level": [1-10],
  "reflection_inclusion": [1-10],
  "irony_usage": [1-10],
  "neologism_frequency": [1-10],
  "ellipsis_usage": [1-10],
  "cultural_reference_inclusion": [1-10],
  "stream_of_consciousness_usage": [1-10],

  "psychological_traits": {{
    "openness_to_experience": [1-10],
    "conscientiousness": [1-10],
    "extraversion": [1-10],
    "agreeableness": [1-10],
    "emotional_stability": [1-10],
    "dominant_motivations": "[achievement/affiliation/power/etc.]",
    "core_values": "[integrity/freedom/knowledge/etc.]",
    "decision_making_style": "[analytical/intuitive/spontaneous/etc.]",
    "empathy_level": [1-10],
    "self_confidence": [1-10],
    "risk_taking_tendency": [1-10],
    "idealism_vs_realism": "[idealistic/realistic/mixed]",
    "conflict_resolution_style": "[assertive/collaborative/avoidant/etc.]",
    "relationship_orientation": "[independent/communal/mixed]",
    "emotional_response_tendency": "[calm/reactive/intense]",
    "creativity_level": [1-10]
  }},

  "age": "[age or age range]",
  "gender": "[gender]",
  "education_level": "[highest level of education]",
  "professional_background": "[brief description]",
  "cultural_background": "[brief description]",
  "primary_language": "[language]",
  "language_fluency": "[native/fluent/intermediate/beginner]",
  "background": "[A brief paragraph describing the author's context, major influences, and any other relevant information not captured above]"
}}

Writing Sample:
{writing_sample}
'''

    url = 'http://localhost:11434/api/generate'
    payload = {
        'model': 'llama3.2',
        'prompt': encoding_prompt.format(writing_sample=writing_sample)
    }
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code != 200:
            print("Error during analyze_writing_sample:")
            print("HTTP Status Code:", response.status_code)
            print("Response Text:", response.text)
            return None

        # Parse the streaming JSON response
        persona_json_str = ""
        for line in response.text.split('\n'):
            if line.strip():
                try:
                    json_response = json.loads(line)
                    if 'response' in json_response:
                        persona_json_str += json_response['response']
                except json.JSONDecodeError:
                    continue

        if not persona_json_str:
            print("No valid 'response' field in API response.")
            return None

        # Extract the JSON part from the response
        json_start = persona_json_str.find('{')
        json_end = persona_json_str.rfind('}') + 1
        if json_start != -1 and json_end != -1:
            persona_json_str = persona_json_str[json_start:json_end]

        # Parse the complete persona JSON
        try:
            persona = json.loads(persona_json_str)
        except json.JSONDecodeError as e:
            print("Failed to parse persona JSON:", e)
            print("Persona JSON:")
            print(persona_json_str)
            return None

        return persona

    except Exception as e:
        print("An error occurred during analyze_writing_sample:", e)
        return None
    
def generate_blog_post(persona, user_topic_prompt):
    url = 'http://localhost:11434/api/generate'
    psychological_traits = persona.get('psychological_traits', {})
    
    # Build the prompt using the persona, handling missing fields
    decoding_prompt = f'''You are to write in the style of {persona.get('name', 'Unknown Author')}, a writer with the following characteristics:

{build_characteristic_list(persona)}

Psychological Traits:
{build_psychological_traits(psychological_traits)}

Additional background information:
{build_background_info(persona)}
    
Now, please write a response in this style about the following topic:
"{user_topic_prompt}" Begin with a compelling title that reflects the content of the post.
'''

    payload = {
        'model': 'llama3.2',
        'prompt': decoding_prompt
    }
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code != 200:
            print("Error during generate_blog_post:")
            print("HTTP Status Code:", response.status_code)
            print("Response Text:", response.text)
            return None

        # Parse the streaming JSON response
        blog_post = ""
        for line in response.text.split('\n'):
            if line.strip():
                try:
                    json_response = json.loads(line)
                    if 'response' in json_response:
                        blog_post += json_response['response']
                except json.JSONDecodeError:
                    continue

        if not blog_post:
            print("No valid 'response' field in API response.")
            return None

        return blog_post.strip()

    except Exception as e:
        print("An error occurred during generate_blog_post:", e)
        return None

def build_characteristic_list(persona):
    characteristics = [
        ('Vocabulary complexity', 'vocabulary_complexity', '/10'),
        ('Sentence structure', 'sentence_structure', ''),
        ('Paragraph organization', 'paragraph_organization', ''),
        ('Idiom usage', 'idiom_usage', '/10'),
        ('Metaphor frequency', 'metaphor_frequency', '/10'),
        ('Simile frequency', 'simile_frequency', '/10'),
        ('Overall tone', 'tone', ''),
        ('Punctuation style', 'punctuation_style', ''),
        ('Contraction usage', 'contraction_usage', '/10'),
        ('Pronoun preference', 'pronoun_preference', ''),
        ('Passive voice frequency', 'passive_voice_frequency', '/10'),
        ('Rhetorical question usage', 'rhetorical_question_usage', '/10'),
        ('List usage tendency', 'list_usage_tendency', '/10'),
        ('Personal anecdote inclusion', 'personal_anecdote_inclusion', '/10'),
        ('Pop culture reference frequency', 'pop_culture_reference_frequency', '/10'),
        ('Technical jargon usage', 'technical_jargon_usage', '/10'),
        ('Parenthetical aside frequency', 'parenthetical_aside_frequency', '/10'),
        ('Humor/sarcasm usage', 'humor_sarcasm_usage', '/10'),
        ('Emotional expressiveness', 'emotional_expressiveness', '/10'),
        ('Emphatic device usage', 'emphatic_device_usage', '/10'),
        ('Quotation frequency', 'quotation_frequency', '/10'),
        ('Analogy usage', 'analogy_usage', '/10'),
        ('Sensory detail inclusion', 'sensory_detail_inclusion', '/10'),
        ('Onomatopoeia usage', 'onomatopoeia_usage', '/10'),
        ('Alliteration frequency', 'alliteration_frequency', '/10'),
        ('Word length preference', 'word_length_preference', ''),
        ('Foreign phrase usage', 'foreign_phrase_usage', '/10'),
        ('Rhetorical device usage', 'rhetorical_device_usage', '/10'),
        ('Statistical data usage', 'statistical_data_usage', '/10'),
        ('Personal opinion inclusion', 'personal_opinion_inclusion', '/10'),
        ('Transition usage', 'transition_usage', '/10'),
        ('Reader question frequency', 'reader_question_frequency', '/10'),
        ('Imperative sentence usage', 'imperative_sentence_usage', '/10'),
        ('Dialogue inclusion', 'dialogue_inclusion', '/10'),
        ('Regional dialect usage', 'regional_dialect_usage', '/10'),
        ('Hedging language frequency', 'hedging_language_frequency', '/10'),
        ('Language abstraction', 'language_abstraction', ''),
        ('Personal belief inclusion', 'personal_belief_inclusion', '/10'),
        ('Repetition usage', 'repetition_usage', '/10'),
        ('Subordinate clause frequency', 'subordinate_clause_frequency', '/10'),
        ('Verb type preference', 'verb_type_preference', ''),
        ('Sensory imagery usage', 'sensory_imagery_usage', '/10'),
        ('Symbolism usage', 'symbolism_usage', '/10'),
        ('Digression frequency', 'digression_frequency', '/10'),
        ('Formality level', 'formality_level', '/10'),
        ('Reflection inclusion', 'reflection_inclusion', '/10'),
        ('Irony usage', 'irony_usage', '/10'),
        ('Neologism frequency', 'neologism_frequency', '/10'),
        ('Ellipsis usage', 'ellipsis_usage', '/10'),
        ('Cultural reference inclusion', 'cultural_reference_inclusion', '/10'),
        ('Stream of consciousness usage', 'stream_of_consciousness_usage', '/10'),
    ]
    
    return '\n'.join([f"- {name}: {persona.get(key, 'N/A')}{suffix}" for name, key, suffix in characteristics])

def build_psychological_traits(traits):
    psychological_traits = [
        ('Openness to experience', 'openness_to_experience', '/10'),
        ('Conscientiousness', 'conscientiousness', '/10'),
        ('Extraversion', 'extraversion', '/10'),
        ('Agreeableness', 'agreeableness', '/10'),
        ('Emotional stability', 'emotional_stability', '/10'),
        ('Dominant motivations', 'dominant_motivations', ''),
        ('Core values', 'core_values', ''),
        ('Decision-making style', 'decision_making_style', ''),
        ('Empathy level', 'empathy_level', '/10'),
        ('Self-confidence', 'self_confidence', '/10'),
        ('Risk-taking tendency', 'risk_taking_tendency', '/10'),
        ('Idealism vs. Realism', 'idealism_vs_realism', ''),
        ('Conflict resolution style', 'conflict_resolution_style', ''),
        ('Relationship orientation', 'relationship_orientation', ''),
        ('Emotional response tendency', 'emotional_response_tendency', ''),
        ('Creativity level', 'creativity_level', '/10'),
    ]
    
    return '\n'.join([f"- {name}: {traits.get(key, 'N/A')}{suffix}" for name, key, suffix in psychological_traits])

def build_background_info(persona):
    background_info = [
        ('Age', 'age'),
        ('Gender', 'gender'),
        ('Education level', 'education_level'),
        ('Professional background', 'professional_background'),
        ('Cultural background', 'cultural_background'),
        ('Primary language', 'primary_language'),
        ('Language fluency', 'language_fluency'),
    ]
    
    info = '\n'.join([f"- {name}: {persona.get(key, 'N/A')}" for name, key in background_info])
    info += f"\n\nBackground: {persona.get('background', 'N/A')}"
    
    return info

def save_blog_post(blog_post, posts_dir='_posts'):
    # Extract the title from the blog post
    lines = blog_post.strip().split('\n')
    title_line = ''
    content_start_index = 0

    for index, line in enumerate(lines):
        line = line.strip()
        if line:
            title_line = line
            content_start_index = index + 1
            break

    if title_line:
        post_title = title_line.lstrip('#').strip()
    else:
        post_title = 'Generated Post'

    # Generate the header
    date_now = datetime.datetime.now(datetime.timezone.utc).astimezone()
    date_str = date_now.strftime('%Y-%m-%d %H:%M:%S %z')
    header = f'''---
layout: post
title:  {post_title}
date:   {date_str}
---

'''

    post_content = '\n'.join(lines[content_start_index:]).strip()
    content = header + post_content

    safe_title = re.sub(r'[^a-z0-9]+', '-', post_title.lower()).strip('-')
    filename_date_str = date_now.strftime('%Y-%m-%d')
    filename = f'{filename_date_str}-{safe_title}.md'

    with open(os.path.join(posts_dir, filename), 'w') as file:
        file.write(content)
    print(f"Blog post saved as {filename}")

def save_persona(persona, personas_file='personas.json'):
    try:
        with open(personas_file, 'r') as file:
            personas_data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        personas_data = []
    personas_data.append(persona)

    with open(personas_file, 'w') as file:
        json.dump(personas_data, file, indent=2)
    print(f"Persona '{persona['name']}' has been saved to {personas_file}")


def main():
    use_existing = input("Do you want to use an existing persona? (y/n): ").lower()
    if use_existing == 'y':
        try:
            with open('personas.json', 'r') as file:
                personas_data = json.load(file)
            print("Available personas:")
            for idx, persona in enumerate(personas_data):
                print(f"{idx + 1}. {persona['name']}")
            choice = int(input("Select a persona by number: ")) - 1
            persona = personas_data[choice]
        except (FileNotFoundError, ValueError, IndexError, KeyError) as e:
            print("Invalid selection or personas.json not found.")
            print(f"Error: {e}")
            return
    else:
        posts = [f for f in os.listdir('_posts') if f.endswith('.md')]
        if not posts:
            print("No posts found in _posts directory.")
            return
        print("Available posts:")
        for idx, post in enumerate(posts):
            print(f"{idx + 1}. {post}")
        choice = int(input("Select a post by number to analyze: ")) - 1
        
        with open(os.path.join('_posts', posts[choice]), 'r') as file:
            writing_sample = file.read()

        persona = analyze_writing_sample(writing_sample)
        if not persona:
            print("Failed to generate persona.")
            return

        save_persona(persona)

    user_topic_prompt = input("Please enter the topic or prompt for the blog post: ")

    blog_post = generate_blog_post(persona, user_topic_prompt)

    if not blog_post:
        print("Failed to generate blog post.")
        return

    save_blog_post(blog_post)

if __name__ == '__main__':
    main()