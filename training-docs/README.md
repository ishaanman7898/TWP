# Training Documents

Place any documents here that you want to include in the chatbot's knowledge base.

Supported formats:
- `.txt` - Plain text files
- `.md` - Markdown files
- `.json` - JSON files

When you add or update files here, run:
```bash
npm run dev
```

The knowledge base will automatically rebuild with your new content!

## How it works

1. Add your document to this folder
2. Run `npm run dev` or `npm run build`
3. The build script automatically reads all files from this folder
4. Content is added to the knowledge base
5. RAG index is rebuilt with the new content
6. Chatbot now knows about your documents!

## Example

Create a file `company-policy.txt`:
```
Our company policy is to provide excellent customer service...
```

Run `npm run dev` and the chatbot will know about your policy!
