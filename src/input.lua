local id = 1
local connURL = "localhost:8080/?type=input&id=" .. id

print("Input a username:")

local username = read()

local monitorShell = multishell.launch({}, "path/to/monitor.lua")
multishell.setTitle(monitorShell, "Chat")
multishell.setTitle(multishell.getCurrent(), "Input")

term.clear()

print("Connected as: " .. username)
print("Any text typed into this window will be sent to the chat.")
print("Refer to the 2nd tab for the chat view.")

while true do

	local message = read()

	ws.send('{"author":"' .. username .. '", "content":"' .. message .. '"}')

end


