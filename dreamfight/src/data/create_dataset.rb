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

File.foreach('./data.txt').with_index do |line, i|
  case line
  when NO_BALL_PATTERN
    item = nil
  when BALL_PATTERN
    matched = BALL_PATTERN.match(line)
    abs = matched[1].split(',').map do |x| 
      x.to_f
    end
    x1, y1, x2, y2 = abs
    w, h = (x2-x1).abs, (y2-y1).abs
    full_width = 1920
    full_height = 1080

    item = [
      (x1/full_width).round(7),
      (y1/full_height).round(7),
      (w/full_width).round(7),
      (h/full_height).round(7)
    ]
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
