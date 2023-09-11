import StudyParticipant from '../domain/StudyParticipantDomain.js';

class StudyParticipantDao {
    // static async createStudyParticipant(data) {
    //     const studyParticipant = new StudyParticipant(data);
    //     return await studyParticipant.save();
    // }

    static async createMultipleStudyParticipants(studyId, participantIds) {
        const existingCount = await StudyParticipant.countDocuments({ studyId });
    
        const data = participantIds.map((participantId, index) => ({
            studyId,
            participantId,
            serialNum: existingCount + index + 1
        }));
        
        return await StudyParticipant.insertMany(data);
    }
    

    static async findStudyParticipantById(id) {
        return await StudyParticipant.findById(id);
    }

    static async findStudyParticipantsByStudyId(studyId) {
        return await StudyParticipant.find({studyId}).lean();
    }

    static async findStudyParticipantsByParticipantId(participantId) {
        return await StudyParticipant.find({participantId}).lean();
    }

    static async updateStudyParticipantById(id, updateData) {
        const studyParticipant = await StudyParticipant.findByIdAndUpdate(id, updateData, {new: true});
        return studyParticipant != null;
    }

    static async deleteStudyParticipantById(id) {
        return await StudyParticipant.findByIdAndDelete(id);
    }
}

export default StudyParticipantDao;
