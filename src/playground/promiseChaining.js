require('../db/mongoose');
const Task = require('../models/task')


// Task.findByIdAndRemove('5d8c5fbbebb51924dc61e4fd')
// .then( task =>{
//     console.log(task)
//     return Task.countDocuments({completed : false})
    
// })
// .then(result => console.log(result))
// .catch( e => console.log(e) ) 

const deleteTaskAndCount = async (id, obj)=>{
    if(id.length !== 24){
        throw new Error('Task not found')
    }
    const deletedTask = await Task.findByIdAndRemove(id);
    const countTasks = await Task.countDocuments(obj)
    return {deletedTask,countTasks}
}

deleteTaskAndCount('5d8c6d391b0ffd3388984074',{completed:false})
.then(result =>{
    console.log('deletedTask ',result.deletedTask)
    console.log('countTasks ',result.countTasks)
}).catch(e=>console.log(e))


