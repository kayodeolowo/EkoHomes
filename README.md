"npm install" to install all dependencies


here is the .env needed to run 

PORT = 10000
NODE_ENV  = development
DB_LOCAL_URI = mongodb+srv://kayode:kayode@kaycluster.aurlurs.mongodb.net/?retryWrites=true&w=majority&appName=KayCluster
CLOUDINARY_CLOUD_NAME= ddiz0k6ze
CLOUDINARY_API_KEY=423326698975587
CLOUDINARY_API_SECRET=6MW4XH5ZxWLkLG2An4gexBN_FMs

ACCESS_TOKEN_SECRET = usdb8495ojd2hufuwbfub3f3ubc48487584u84yrfc

post property
http://localhost:10000/api/v1/createProperty

get properties
http://localhost:10000/api/v1/properties

get properties search
http://localhost:10000/api/v1/properties?search=Down

get property by id
http://localhost:10000/api/v1/properties/{id}

"npm run dev" to start app
