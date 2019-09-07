import requests 

data ={'api_paste_format':'python'}
endpoint ="http://127.0.0.1:5000/test"
r = requests.post(url = endpoint, data = data) 
  
# extracting response text  
pastebin_url = r.text 
print("The pastebin URL is:%s"%pastebin_url) 