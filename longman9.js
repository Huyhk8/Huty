# Import the requests library to make web requests
import requests

# Define the base URL for the Longman Dictionary API
base_url = "https://api.ldoceonline.com/v2/"

# Define the API key (replace with your own)
api_key = "YOUR_API_KEY"

# Define a function to get the dictionary entry for a word
def get_entry(word):
  # Construct the URL for the entry endpoint
  url = base_url + "entries/" + word
  # Add the API key as a query parameter
  params = {"apikey": api_key}
  # Make a GET request and get the response as JSON
  response = requests.get(url, params=params).json()
  # Return the response
  return response

# Define a function to print the dictionary entry in a readable format
def print_entry(entry):
  # Get the headword and part of speech
  headword = entry["headword"]
  part_of_speech = entry["part_of_speech"]
  # Print the headword and part of speech
  print(f"{headword} ({part_of_speech})")
  # Loop through the senses of the entry
  for sense in entry["senses"]:
    # Get the definition and examples
    definition = sense["definition"][0]
    examples = sense.get("examples", [])
    # Print the definition
    print(f"- {definition}")
    # Loop through the examples
    for example in examples:
      # Get the text of the example
      text = example["text"]
      # Print the example
      print(f"  * {text}")
  # Print a blank line
  print()

# Ask the user to enter a word
word = input("Enter a word: ")

# Get the dictionary entry for the word
entry = get_entry(word)

# Print the dictionary entry
print_entry(entry)
