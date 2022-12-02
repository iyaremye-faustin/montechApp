import express from "express";
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import indexRouter from "./routes/index";

const options={
  definition:{
      openapi:"3.0.0",
      info:{
          title:"MovieApp API",
          version:"1.0.0",
          description:"Movie App CRUD API "
      },
      path:{},
      security:[
        {
          bearerAuth:[]
        }
      ],
      components:{
        securitySchemes:{
          bearerAuth:{
            type:'http',
            scheme:'bearer',
            bearerFormat:'JWT',
            name:'authorization',
            in:'header',
          }
        }
      },
      servers:[
        {
            url:"http://localhost:3000",
            description:"API Server"
        }
      ],
  },
  apis:['./**/*.yaml'],  
};

const app=express();
const specs=swaggerJsDoc(options);
app.use(express.json());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.use('*', (req, res) => {
  res.status(404).json({message:'Not Found'});
});

export default app;