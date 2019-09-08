from docxtpl import DocxTemplate
import jinja2

from flask import Flask , request  	 
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.url_map.strict_slashes = False

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/test/" , methods=['GET', 'POST'])
@cross_origin()
def index():
    print(request.data)
    doc = DocxTemplate("template.docx")
    #context = { 'some_content1' : "test", "some_content_2": "other"}  # Where the magic happens
    #doc.render(context)
    doc.render(request.data)
    
    doc.save("generated_doc1.docx")
    return request.data
if __name__ == "__main__":
    app.run()

