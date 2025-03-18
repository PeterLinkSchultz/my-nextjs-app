// import { OpenAI } from "openai";
import z from "zod";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { Analysis } from "@prisma/client";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the journal entry."),
    subject: z.string().describe("a subject of the journal entry."),
    color: z
      .string()
      .describe(
        "a hexidecimal color of the journal entry. Example: #0101FE for blue presenting happiness "
      ),
    negative: z.boolean().describe("is the journal entry negative?"),
  })
);

const model = new ChatOpenAI({
  temperature: 0,
  model: "gpt-3.5-turbo",
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const getPromt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. 
    Follow the instructions and format your response to match format instructions, no matter what! 
    \n{formatInstructions}\n{entry}`,
    inputVariables: ["entry"],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.invoke({
    entry: content,
  });

  return input;
};

const request = async (content: string) => {
  const prompt = await getPromt(content);

  return model.invoke(prompt);
};

export const analyze = async (content: string) => {
  const response = await request(content);

  try {
    return parser.parse(response.content.toString());
  } catch {
    return null;
  }
};
