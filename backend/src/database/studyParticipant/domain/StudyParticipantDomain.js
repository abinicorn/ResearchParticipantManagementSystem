import mongoose from 'mongoose';

const studyParticipantSchema = new mongoose.Schema({
    studyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Study'
    },
    serialNum: {
        type: Number
    },
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    isGift: {
        type: Boolean,
        default: false
    },
    isSentGift: {
        type: Boolean,
        default: false
    },
    isWIllReceiveReport: {
        type: Boolean,
        default: false
    },
    isSentReport: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ""
    }
}, {
    timestamps: {}
});

// studyParticipantSchema.pre('save', async function(next) {
//     if (this.isNew) {  
//         const count = await mongoose.model('StudyParticipant').countDocuments({ studyId: this.studyId });
//         this.serialNum = count + 1;  
//     }
//     next();
// });

const StudyParticipant = mongoose.model('StudyParticipant', studyParticipantSchema,'StudyParticipant');

export default StudyParticipant;
