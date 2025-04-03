import Insight from "../models/insights.model.js";


export const addInsight = async (req, res) => {
    try {
      const { title, description, category, photo } = req.body;
      const Id = req.doct._id; //  middleware adds  info
  
      const newInsight = new Insight({ title, description, category, photo, createdBy: Id });
      await newInsight.save();
  
      res.status(201).json({ message: "Insight added successfully", insight: newInsight });
    } catch (error) {
      res.status(500).json({ message: "Error adding insight", error });
    }
};


export const getAllInsights = async (req, res) => {
  try {
    const insights = await Insight.find().populate("createdBy", "name specialization");
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: "Error fetching insights", error });
  }
};

export const getInsightById = async (req, res) => {
  try {
    const insight = await Insight.findById(req.body.id).populate("createdBy", "name specialization");
    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    res.status(200).json(insight);
  } catch (error) {
    res.status(500).json({ message: "Error fetching insight", error });
  }
};

export const getInsightsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const insights = await Insight.find({ category }).populate("createdBy", "name specialization");
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: "Error fetching insights by category", error });
  }
};
