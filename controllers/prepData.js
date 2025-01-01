function prepData(){
    let content = []
    try{
        content = require('../data/data.json')
    }
    catch(err){ //Not a great method, but works for this small set
        content = [
            {name: 'Albert', message: 'Hello, all!', date: new Date()},
            {name: 'Leslie', message: 'How is everyone doing?', date: new Date()},
            {name: 'Kurtis', message: 'Evening everyone.', date: new Date()}
        
        ]
    }
    return content
    
}

module.exports = prepData