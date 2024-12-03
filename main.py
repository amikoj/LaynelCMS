from app import init_app

config = {}

# Initialize the app
app = init_app(config)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)