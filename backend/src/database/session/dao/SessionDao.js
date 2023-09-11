import Session from '../domain/SessionDomain.js';

class SessionDao {

    static async createSession(session) {

        const dbSession = new Session(session);
        await dbSession.save();
        return dbSession;
    }
    
    static async retrieveSessionList() {
        return await Session.find();
    }
    
    static async retrieveSessionById(id) {
        return await Session.findById(id);
    }

    static async retrieveSessionByStudyId(id) {
        return await Session.find({ studyId: id});
    }
    
    static async updateSession(session) {
    
        const dbSession = await Session.findOneAndUpdate({ _id: session._id }, session, { new: true });
        return dbSession != null;

    }
    
    static async deleteSession(id) {
        await Session.deleteOne({ _id: id });
    }
    
}

export default SessionDao;