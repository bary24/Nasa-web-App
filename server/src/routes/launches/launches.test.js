const app=require("../../app");
const request=require("supertest");
const {connectMongo}=require("../../services/mongo");

describe("Testing launches api integrated with mongoDb",()=>{
    beforeAll(async ()=>{
        await connectMongo();
    })
    describe("Testing launches api",()=>{

        const completeLaunchData={
            target: "Kepler-1652 b"   ,
            rocket:"MJS37",
            mission:"LSW09",
            launchDate:"January 23, 2023"
        
        };
    
        const launchDataWithoutDate={
            target: "Kepler-1652 b"   ,
            rocket:"MJS37",
            mission:"LSW09"
        }
    const launchDataWithInvalidDate={
        target: "Kepler-1652 b"   ,
        rocket:"MJS37",
        mission:"LSW09",
        launchDate:"msko"
    }
    test("get request on launches router returns 200 status code",async()=>{
       const response=await request(app).get("/launches").
       expect("Content-Type",/json/)
       .expect(200);
    });
    
    test("post request returns 201 status code",async()=>{
    const response=await request(app).post("/launches")
    .send(completeLaunchData).expect("Content-Type",/json/)
    .expect(201);
    
    expect(response.body).toMatchObject(launchDataWithoutDate);
    const requestDate=new Date(completeLaunchData.launchDate).valueOf();
    const responseDate=new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    
    
    })
    test("catching error of missing property on request object",async()=>{
        const response=await request(app).post("/launches")
        .send(launchDataWithoutDate).expect("Content-Type",/json/)
        .expect(400);
    
        expect(response.body).toStrictEqual({
            error:"Missing launch property!"
        });
    })
    test("catching error when the date format is invalid",async()=>{
        const response=await request(app).post("/launches")
        .send(launchDataWithInvalidDate).expect("Content-Type",/json/)
        .expect(400);
        expect(response.body).toStrictEqual({
            error:"invalid date format"
        });
    })
    
    });





})




