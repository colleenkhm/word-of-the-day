const Entry = require('./Entry');
const User = require('./User');
const Comment = require('./Comment');

// Entry belongs to user
Entry.belongsTo(User, {
    foreignKey: 'user_id'
});

// User will have many entries
User.hasMany(Entry, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Entry will have many comments
Entry.hasMany(Comment, {
    foreignKey: 'entry_id',
    onDelete: 'CASCADE'
})
// Comment belongs to entry
Comment.belongsTo(Entry, {
    foreignKey: 'entry_id'
})
// User belongs to comment


module.exports = {
    Entry,
    Comment,
    User,
}