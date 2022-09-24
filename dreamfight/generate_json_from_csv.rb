require 'json'
require 'pp'
require 'pry'
FPS = 15
CHUNK_SIZE_SECONDS = 6
n = FPS * CHUNK_SIZE_SECONDS

BALL_PATTERN   = /\[([0-9\.\,\s\-e\+]*)\]/
NO_BALL_PATTERN = /None|null/

results = []
chunk = []
j = 0

File.foreach('./pong.txt').with_index do |line, i|
  case line
  when NO_BALL_PATTERN
    item = nil
  when BALL_PATTERN
    matched = BALL_PATTERN.match(line)
    item = matched[1].split(',').map{ |x| x.to_f }
  else
    raise Exception
  end

  if j < n
    chunk << item
    j += 1
  else
    results << chunk
    chunk = []
    j = 0
  end
end

STDOUT.print(results.to_json)
