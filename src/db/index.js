import pgPromise from 'pg-promise'

const pgp = pgPromise()

const connectDB = async() =>
{
    try{
         const db = pgp(process.env.DATABASE_URL)
         const connection = await db.connect()
         connection.done()

         console.log("database connected in the db")

         return db
    }
    catch(err)
    {
        console.log("database connection failed in the db")
        process.exit(1)
    }
}

export default connectDB