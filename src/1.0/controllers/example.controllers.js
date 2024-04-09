exports.createExamples = async (req, res) => {
    try {
        var newExample = new Example({
            example: req.body.example,
        })
        await newExample.save()
        return res.status(200).json(newExample)
    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json(errors);
        }
        if (error.name === "MongoServerError") {
            return res.status(400).json({ message: error.message });

        }
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

exports.readAll = async (req, res) => {
    try {
        if (req.params.id) {
            const examples = await Example.find({ _id: req.params.id })
            const json = examples
            return res.status(200).json(json)
        }
        const examples = await Example.find()
        const json = examples
        return res.status(200).json(json)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.readExample = async (req, res) => {
    try {
        if (req.params.id) {
            return res.status(200).json(await Example.find({ _id: req.params.id }))
        }
        return res.status(200).json(await Example.find())
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.updateExample = async (req, res) => {
    try {
        const updatedExample = await Example.findOneAndUpdate({ _id: req.params.id }, req.body)
        if (updatedExample != null) {
            return res.status(200).json({ message: `Example ${req.params.id} updated!` })
        }
        return res.status(404).json({ message: `Example ${req.params.id} not found!` })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.deleteExample = async (req, res) => {
    try {
        const deletedExample = await Example.deleteOne({ _id: req.params.id })
        if (deletedExample.deletedCount != 0) {
            return res.status(200).json({ message: `Example ${req.params.id} deleted!` })
        }
        return res.status(404).json({ message: `Example ${req.params.id} not found!` })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}