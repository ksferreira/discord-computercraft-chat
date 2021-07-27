os.loadAPI("path/to/json.lua")

local id = os.getComputerID()
local connURL = "localhost:8080/?type=monitor&id=" .. id

local ws, err = http.websocket(connURL)

while true do
	local event, url, response = os.pullEventRaw()

	if event == "websocket_message" then

		-- print(response)

		if url == connURL then

			local obj = json.decode(response)

			-- response format for reference
			-- {
			-- 	"author": author,
			-- 	"content": content
			-- }

			if obj ~= nil then
				
				local author = obj.author
				local content = obj.content
				
				print("<" .. author .. "> " .. content)
			end

		end

	end

end
