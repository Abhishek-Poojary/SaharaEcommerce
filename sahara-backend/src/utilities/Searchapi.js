class Searchapi{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }


    Search(){ 

        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{};
     
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){ 
   

        const arr={...this.queryStr};

        const key=["keyword","page","limit","tags","category"];

        key.forEach((key)=> delete arr[key]);

        let str=JSON.stringify(arr);

        str=str.replace(/\b(gt)\b/g, (key)=> `$${key}`);
        str=str.replace(/\b(gte)\b/g, (key)=> `$${key}`);
        str=str.replace(/\b(lte)\b/g, (key)=> `$${key}`);
        str=str.replace(/\b(lt)\b/g, (key)=> `$${key}`);

        this.query= this.query.find(JSON.parse(str));

        return this;

    }

    pagination(limitNumberOfPages){

        const currentpage= Number(this.queryStr.page)  || 1;
        let skip=limitNumberOfPages *(currentpage -1);

        this.query= this.query.limit(limitNumberOfPages).skip(skip);
        return this;

    }


    SearchTags(){
        // in Case users wants to select more than one tags 
        // console.log(this.queryStr)
        // tag=["moto","oppo"]
        //console.log(this.queryStr.tags)
        //  ["moto","oppo"]

        const modified=this.queryStr.tags?{
            tags:{
                $all:this.queryStr.tags
            }
        }:{};
        console.log(modified)
        this.query=this.query.find(modified);
        return this;
    }
}


module.exports=Searchapi