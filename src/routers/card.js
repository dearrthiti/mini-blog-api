const express = require('express')
const router = new express.Router()
const Card = require('../models/card')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/cards', auth, async (req, res) => {
    // passing the object to save the new task
    // const tasks = new Task(req.body)
    const card = new Card({
        ...req.body,
        author: req.user._id
    })

    try {
        await card.save()

        res.status(201).send(card)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get cards
router.get('/cards', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.status) {
        match.status = req.query.status === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');

        sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'cards',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send(req.user.cards)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/cards/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const _card = await Card.findOne({_id, author: req.user._id})

        if (!_card) {
            return res.status(404).send()
        }

        res.send(_card)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/cards/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const _id = req.params.id

    console.log(_id, req.user._id)

    try {
        const card = await Card.findOne({_id: _id, author: req.user._id})

        if (!card) {
            return res.status(400).send()
        }

        updates.forEach((update) => card[update] = req.body[update])
        await card.save()

        res.send(card)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/cards/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const card = await Card.findOne({_id: _id, author: req.user._id})

        if (!card) {
            res.status(400).send()
        }

        await card.remove()
        res.send(card)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router