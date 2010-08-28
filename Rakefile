#
# Build JS Files
#
require 'rake/packagetask'

# We have to make sure src/core.js is included first.
SRC = 'src/carousel.js'
CSS = 'src/carousel.css'
MINOUTPUT = 'build/carousel.min.js'
MINCSS = 'build/carousel.css'
JAVA = 'java'
JS = 'js'

desc "Minify script"
task :minify do
	`#{JAVA} -jar tools/yuicompressor.jar -v #{SRC} -o #{MINOUTPUT}`	
	`#{JAVA} -jar tools/yuicompressor.jar -v #{CSS} -o #{MINCSS}`
	puts MINOUTPUT + ': ' + File.size(MINOUTPUT).to_s
	puts "total: " + File.size(MINOUTPUT).to_s
end

desc "Lint"
task :lint do
	puts `#{JS} tools/jslint.js #{SRC}`
end

desc "Syntax Check"
task :syntax do
	puts `#{JS} -f #{SRC}`
end

desc "Default Action"
task :default => [:minify]
