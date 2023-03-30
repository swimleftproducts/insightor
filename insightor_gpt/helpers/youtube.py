

def batch_comments(comments, batch_size):
    # remove new lines and periods and spaces
    processed_comments = [remove_newlines(comment) for comment in comments]
    # this will store lists of lists, with each list being a list of array
    batched_comments = []
    for i in range(0, len(processed_comments), batch_size):
        batch = processed_comments[i:i+batch_size]
        comment_batch = ''
        for j in range(len(batch)):
            comment = batch[j]
            comment = "#comment" + f"#{j}# " + comment
            comment_batch = comment_batch + comment
        batched_comments.append(comment_batch+'#end#')
    return batched_comments
