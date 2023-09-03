
const user = {
    _id: "64dddcc62970769b51e20577",
    picture: "http://placehold.it/32x32",
    level: 1,
    pid: 0,
    id: 1,
    name: "Traci Duffy",
    gender: "female",
  }
  
  let uid = user.id;
  let pdata = 
    {
      ...user,
      children:[]
    }
  
  
  
  const arrangeData = (data,uid) => {
    let children = data.filter(child => child.pid === uid);
    pdata.children = children;
  
    children.forEach(child => {
      arrangeData(data,child.id);
    });
  };
  // arrangeData(data,uid)
  
  // const temp = {}
  
  
  // const root = data.filter((value) => {
  //   const { id, pid } = value;
    
  //   temp[id] = value;
    
  //   if(pid == null) return true;
    
  //   (temp[pid].children || (temp[pid].children = [])).push(value);
  // });
  
  // console.log(root);
  
  
  const tasks = [
    { id: 1, pid: null, value: 'Make breakfast' },
    { id: 2, pid: 1, value: 'Brew coffee' },
    { id: 3, pid: 2, value: 'Boil water' },
    { id: 4, pid: 2, value: 'Grind coffee beans' },
    { id: 5, pid: 2, value: 'Pour water over coffee grounds' },
    { id: 6, pid: 3, value: 'Pour water over coffee grounds' }
  
  ];
  
  const temp = Object.create(null);
  
  // const root = tasks.filter((value) => {
  //   const { id, pid } = value;
    
  //   temp[id] = value;
    
  //   if(pid == null) return true;
    
  //   (temp[pid].children || (temp[pid].children = [])).push(value);
  // });
  
  const root = tasks.filter((value,i, arr) => {
    const { id, pid } = value;
  
    temp[id] = value;
    // console.log("--",arr)
    if(pid == null) return true;
    
    (temp[pid].children || (temp[pid].children = [])).push(value);
  });
  
  // console.log("rootNodes",root);
  // console.log("temp", temp);
  

  
  // console.log(d);



  ////////////////


  const relations =[
    {
      "_id": {
        "$oid": "64ec6279cb4feb4986f32212"
      },
      "uid": "pVD0WTvyz1aEkSKJddg5jqtdVE93",
      "parentId": null,
      "relationType": "",
      "relationName": "Sanjiv",
      "relationUid": "64eb1d02c996bb32ad2153d8",
      "createdAt": {
        "$date": "2023-08-28T09:01:45.221Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "64ec6279cb4feb4986f32212"
      },
      "uid": "pVD0WTvyz1aEkSKJddg5jqtdVE93",
      "parentId": "64eb1d02c996bb32ad2153d8",
      "relationType": "Father",
      "relationName": "laxman",
      "relationUid": "64ec4450d3550ac7e1d1b0dc",
      "createdAt": {
        "$date": "2023-08-28T09:01:45.221Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "64ec6339cb4feb4986f3221a"
      },
      "uid": "pVD0WTvyz1aEkSKJddg5jqtdVE93",
      "parentId": "64eb1d02c996bb32ad2153d8",
      "relationType": "Mother",
      "relationName": "phool",
      "relationUid": "64ec6332cb4feb4986f32217",
      "createdAt": {
        "$date": "2023-08-28T09:04:57.475Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "64eca1909106c21fa160d1ae"
      },
      "uid": "pVD0WTvyz1aEkSKJddg5jqtdVE93",
      "parentId": "64ec6332cb4feb4986f32217",
      "relationType": "Sister",
      "relationName": "jyoti",
      "relationUid": "64eca13e9106c21fa160d1a5",
      "createdAt": {
        "$date": "2023-08-28T13:30:56.116Z"
      },
      "__v": 0
    }
  ]

  let r2 =[
    {
       "_id":"64eb1d02c996bb32ad2153d8",
       "uid":"pVD0WTvyz1aEkSKJddg5jqtdVE93",
       "parentId":null,
       "relationType":"",
       "relationName":"sanjiv",
       "relationUid":"64eb1d02c996bb32ad2153d8",
       "createdAt":{
          "$date":"2023-08-27T09:53:06.283Z"
       },
       "__v":0
    },
    {
       "_id":"64ec6279cb4feb4986f32212",
       "uid":"pVD0WTvyz1aEkSKJddg5jqtdVE93",
       "parentId":"64eb1d02c996bb32ad2153d8",
       "relationType":"Father",
       "relationName":"laxman",
       "relationUid":"64ec4450d3550ac7e1d1b0dc",
       "createdAt":"2023-08-28T09:01:45.221Z",
       "__v":0
    },
    {
       "_id":"64ec6339cb4feb4986f3221a",
       "uid":"pVD0WTvyz1aEkSKJddg5jqtdVE93",
       "parentId":"64eb1d02c996bb32ad2153d8",
       "relationType":"Mother",
       "relationName":"phool",
       "relationUid":"64ec6332cb4feb4986f32217",
       "createdAt":"2023-08-28T09:04:57.475Z",
       "__v":0
    },
    {
       "_id":"64ecdb3b0c3731b04cbc7250",
       "uid":"pVD0WTvyz1aEkSKJddg5jqtdVE93",
       "parentId":"64eb1d02c996bb32ad2153d8",
       "relationType":"Uncle",
       "relationName":"tsetx",
       "relationUid":"64ecdb040c3731b04cbc724b",
       "createdAt":"2023-08-28T17:36:59.818Z",
       "__v":0
    },
    {
       "_id":"64eca1909106c21fa160d1ae",
       "uid":"pVD0WTvyz1aEkSKJddg5jqtdVE93",
       "parentId":"64ec6332cb4feb4986f32217",
       "relationType":"Sister",
       "relationName":"jyoti",
       "relationUid":"64eca13e9106c21fa160d1a5",
       "createdAt":"2023-08-28T13:30:56.116Z",
       "__v":0
    }
 ]

  const rl = r2.filter((value,i, arr) => {
    const { relationUid, parentId } = value;
    temp[relationUid] = value;
    if(parentId == null) return true;
    (temp[parentId].children || (temp[parentId].children = [])).push(value);
  });

  console.log("rl",JSON.stringify(rl));

  const getTree =async (data, root) => {
  const temp = Object.create(null);
     return data.filter((value,i, arr) => {
      const { relationUid, parentId } = value;
      temp[relationUid] = value;
      if(parentId == null) return true;
      (temp[parentId].children || (temp[parentId].children = [])).push(value);
    });
  }