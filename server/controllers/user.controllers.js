const db = require("../db");
class UserController {
    async createUser(req, res) {
        const { name, party } = req.body;
        const newUser = await db.query(
            `INSERT INTO users (name, party) VALUES ($1, $2) RETURNING *`,
            [name, party]
        );
        res.json(newUser.rows[0]);
    }
    async getUsers(req, res) {
        const users = await db.query("SELECT * FROM users");
        res.json(users.rows);
    }
    async getUser(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {
        const { id, name, party } = req.body;
        const user = await db.query(
            "UPDATE users SET name = $1, party = $2 where id = $3 RETURNING *",
            [name, party, id]
        );
        res.json(user.rows[0]);
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UserController();
