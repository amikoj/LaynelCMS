from app import init_app
import uvicorn

config = {}

# Initialize the app
app = init_app(config)

if __name__ == '__main__':
    '''
    Run the app using uvicorn server.
    '''
    # uvicorn.run(app= 'main:app', host='127.0.0.1', port=8000, reload=True, workers=4)
    uvicorn.run(app= 'main:app', host='127.0.0.1', port=8000, reload=True)