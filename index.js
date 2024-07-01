import openai from "./config/openAI.js"
import readlineSync from "readline-sync"
import colors from "colors"
async function main() {
    console.log(colors.bold.blue("Welcome to ChatGPT."))
    console.log(colors.bold.blue("You can ask questions about anything you want."))
    console.log(colors.bold.bgWhite.red("Type 'exit' to leave the app."))

    const chatHistory = []

    while (true) {
        const userInput = readlineSync.question(colors.yellow("You: "))

        try {
            // Call api for user input

            const messages = chatHistory.concat({ role: "user", content: userInput })

            
            const completions = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            
            const completionText = completions.choices[0].message.content
            
            
            
            if (userInput.toLowerCase() === "exit") {
                console.log(colors.green("ChatGPT: " + completionText))
                return;
            }
            
            console.log(colors.green("ChatGPT: " + completionText))
            
            chatHistory.push({ role: "user", content: userInput })
            chatHistory.push({ role: "assistant", content: completionText })

        } catch (error) {
            console.error(colors.red(error))
        }
    }
}

main()