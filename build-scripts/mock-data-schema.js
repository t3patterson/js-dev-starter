let usersSchema = {
   "type" : "array",
   "minItems" : 10,
   "maxItems" : 20,
   "items": {
      "type" : "object",
      "properties" : {
         "id" : {"type": "number", "unique" : true , "minimum" : 1 },
         "firstName" : {"type": "string", "faker" : "name.firstName" },
         "lastName" : {"type": "string", "faker" : "name.lastName" },
         "email" : {"type": "string", "faker" : "internet.email" },
      },
      required: ['id', 'firstName', 'lastName', 'email']
   }
}

let companiesSchema = {
   "type" : "array",
   "minItems" : 10,
   "maxItems" : 20,
   "items": {
      "type" : "object",
      "properties" : {
         "id" : {"type": "number", "unique" : true , "minimum" : 1 },
         "name" : {"type": "string", "faker" : "company.companyName" },
         "suffix" : {"type": "string", "faker" : "company.companySuffix" },
         "descriptor" : {"type": "string", "faker" : "company.catchPhrase" },
      },
      required: ['id', 'name', 'suffix']
   }
}


export const apiSchema = {
	"type": "object",
	"properties": {
		"users" : usersSchema,
      "companies": companiesSchema
	},
   required: ['users', 'companies']
}
