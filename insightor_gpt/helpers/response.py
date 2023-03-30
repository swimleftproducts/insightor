def parse_response(response):
    # Split the response text by '###'
    parsed_text = response.split('###')

    # Remove leading and trailing whitespace from each text piece
    parsed_text = [text.strip() for text in parsed_text]

    return parsed_text
