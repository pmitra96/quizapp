import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const QuizSchema = new mongoose.Schema({

  createdBy: {
    type: String,
    required: true,
  },
  lastEditedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  questions:
    {_id: false,
      type: [{
        sNo: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        options:
        {
          type: [
            {
              sNo: {
                type: Number,
                required: true,
              },
              text: {
                type: String,
                required: true,
              },
              isCorrect: {
                type: Boolean,
                required: true,
              },
            }],
          _id: false,
        },
        isMultiple: {
          type: Boolean,
          required: true,
          default: false,
        },
      }],
      required: true,
    },
  isPublished: {
    type: Boolean,
    required: true,
  },
});

QuizSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Quiz', QuizSchema);

