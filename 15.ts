interface test {
    name:string
    age:number
}



interface test2 extends test{
   dest:"string"
   phn:number
}


const object : test2 = {
    name:"het",
    age:15,

}
console.log(object)