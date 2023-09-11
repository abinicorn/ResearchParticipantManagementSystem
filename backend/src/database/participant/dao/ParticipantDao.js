import Participant from '../domain/ParticipantDomain.js';

class ParticipantDao {

    static async createMultipleParticipants(participantsData) {
        return await Participant.insertMany(participantsData, { ordered: false });
    }

    static async getAllParticipants() {
        return await Participant.find({});
    }

    static async getParticipantById(participantId) {
        return await Participant.findById(participantId).lean();
    }

    static async findParticipantsByEmails(emails) {
        return await Participant.find({ email: { $in: emails } });
    }

    // static async getParticipantByEmail(email) {
    //     return (await Participant.findOne({ email: email }, '_id'))?._id ?? null;
    // }

    static async updateParticipantById(participantId, updateData) {
        const participant = await Participant.findByIdAndUpdate(participantId, updateData, {new: true});
        return participant != null;
    }

    static async deleteParticipant(participantId) {
        return await Participant.findByIdAndDelete(participantId);
    }
}

export default ParticipantDao;
