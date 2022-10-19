require 'json'
require 'byebug'
require 'pp'
require 'pry'

FPS = 15
CHUNK_SIZE_SECONDS = 6
FRAMES_PER_CHUNK = FPS * CHUNK_SIZE_SECONDS

BALL_PATTERN   = /\[([0-9\.\,\s\-e\+]*)\]/
NO_BALL_PATTERN = /None|null/

results = []
seen = {}
curr_dir  = 0
curr_file = -1

File.foreach('./serviceShot.txt').each do |line|
  # Ignore duplicates based on filename
  fname = line.split(',')[1]
  if seen[fname]
    next
  end
  seen[fname] = true

  # Fill in missing gaps before processing item, if needed
  next_dir  = fname.split('/')[-2].to_i
  next_file = fname.split('/')[-1].to_i
  if next_dir > curr_dir
    # flush out the curr dir to the end
    max_files = 449
    remaining = max_files - curr_file

    if remaining > 0
      extra = ((curr_file+1)..max_files).to_a
      # results = [*results, *extra.map{ |f| "(dir=#{curr_dir}, file=#{f})" }]
      results = [*results, *extra.map{ |f| [nil, nil] }]
    end

    # Because we have flushed out the current dir, we're back to 0 on the file
    curr_file = 0

    # Add entire dirs if there's a gap
    gap = next_dir - curr_dir
    if gap > 1
      extra = (0..max_files).to_a
      (gap-1).times do |i|
        curr_dir = curr_dir + i + 1
        # results = [*results, *extra.map{ |f| "(dir=#{curr_dir}, file=#{f})" }]
        results = [*results, *extra.map{ |f| [nil, nil] }]
      end
    end

    # flush out files
    gap = next_file - curr_file
    if gap > 1
      extra = ((curr_file)...next_file).to_a
      # results = [*results, *extra.map{ |f| "(dir=#{curr_dir + 1}, file=#{f})" }]
      results = [*results, *extra.map{ |f| [nil, nil] }]
    end
  elsif next_dir == curr_dir
    gap = next_file - curr_file 

    if gap > 1
      extra = ((curr_file+1)...next_file).to_a
      # results = [*results, *extra.map{ |f| "(dir=#{curr_dir}, file=#{f})" }]
      results = [*results, *extra.map{ |f| [nil, nil] }]
    end
  else
    raise Exception.new('not expected')
  end
  curr_file = next_file
  curr_dir  = next_dir

  # Process item
  betting_state  = line.split(',')[2]
  service_result = line.split(',')[7]

  item = [
    betting_state == '' ? nil : betting_state,
    service_result == '' ? nil : service_result
  ]

  results << item
end

STDOUT.print(results.to_json)
