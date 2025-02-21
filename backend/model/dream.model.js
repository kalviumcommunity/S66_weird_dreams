const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    emotions: [{ 
        type: String, 
        enum: ['happy', 'scared', 'excited', 'confused', 'calm', 'sad', 'angry', 'surprised','frustrated','nostalgic','anxious'] 
    }], 
    lucid: { 
        type: Boolean, 
        default: false 
    },
    nightmare: { 
        type: Boolean, 
        default: false 
    },
    recurring: { 
        type: Boolean, 
        default: false 
    },
    tags: [{ type: String }],
});

const DreamModel = mongoose.model('Dream', dreamSchema);

module.exports = DreamModel;
