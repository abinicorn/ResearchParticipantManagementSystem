import  Researcher  from "../domain/ResearcherDomain.js";

class ResearcherDao  {

    static async  createResearch(research) {

        const dbResearch = new Researcher(research);
        await dbResearch.save();
        return dbResearch;

    }

    static async  retrieveResearcherList() {

        return  await Researcher.find();
    }

    static async  getResearcherById(id) {
        return  await Researcher.findById(id);
    }

    static async  retrieveResearcherByFirstName(firstName) {

        const researcher = await Researcher.find({
            researcherFirstName: { $regex: firstName, $options: 'i' }
        });
        return researcher;
    }

    static async  retrieveResearcherByLastName(lastName) {

        const researcher = await Researcher.find({
            researcherLastName: { $regex: lastName, $options: 'i' }
        });
        return researcher;
    }

    static async getResearcherByEmail(email){
        const researcher = await Researcher.find({email: email});

        return researcher;
    }

    static async  updateResearcher(researcher, firstName, lastName, email){


        researcher.firstName = firstName;
        researcher.lastName = lastName;
        researcher.email = email;
        const dbResearcher = await Researcher.findOneAndUpdate({ _id: researcher._id}, researcher, {new: true});

        return dbResearcher != null;
    }


    static async  updateResearcherByResearcherId(researcherId, updateData) {

        const dbResearcher = await Researcher.findOneAndUpdate({ _id: researcherId}, { $push: { studyList: updateData } }, {new: true});

        return dbResearcher != null;
    }

    static async login(username, password){

        const user = await Researcher.findOne({ username: username, password: password });

        return user;

    }

    static async resetResearcherPwd(researcher, newPwd){

        researcher.password = newPwd;

        const dbResearcher = await Researcher.findOneAndUpdate({ _id: researcher._id}, researcher, {new: true});

        return dbResearcher != null;
    }

    static async checkPassword(researcher, password){

        return researcher.password == password;

    }

}

export {ResearcherDao};




