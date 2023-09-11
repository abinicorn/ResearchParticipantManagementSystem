import Study from "../domain/StudyDomain.js";


class StudyDao {
    static async createStudy(study) {

        const dbStudy = new Study(study);
        await dbStudy.save();
        return dbStudy;
    }


    static async retrieveAllStudyList() {
        return await Study.find();
    }

    static async retrieveStudy(id) {
        return await Study.findById(id);
    }

    static async retrieveStudyList(idList){
        return await Study.find({ _id: {$in: idList}});
    }

    static async updateStudy(StudyId, Study) {
        //add {new true} variable will hold the updated study document with the latest changes as {new: true}
        //This can be useful for displaying or further processing the updated information.
        const dbStudy = await Study.findOneAndUpdate(StudyId, Study, { new: true });
        return dbStudy != NULL;
    }


    static async deleteStudyById(id) {
        await Study.deleteOne({ _id: id });
    }
    
    static async retrieveResearcherIdListByStudyId(studyId) {
        
        try {
            const study = await Study.findById(studyId);
            const researcherIds = study.researcherList; 
            if (!study) {
                return null; // Study not found
            }
            return researcherIds;
        } catch (error) {
            console.error(error);
        }
    }
}

export default StudyDao;