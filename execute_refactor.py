import os
import shutil
import re

base_dir = r"c:\Users\Himanshu\Desktop\CLASS\sem 6\Pep\Pro Game"
html_dir = os.path.join(base_dir, "html")
css_dir = os.path.join(base_dir, "css")
js_dir = os.path.join(base_dir, "js")

os.makedirs(html_dir, exist_ok=True)
os.makedirs(css_dir, exist_ok=True)
os.makedirs(js_dir, exist_ok=True)

all_files = [f for f in os.listdir(base_dir) if os.path.isfile(os.path.join(base_dir, f))]

html_files = [f for f in all_files if f.endswith('.html') and f != 'index.html']
css_files = [f for f in all_files if f.endswith('.css')]
js_files = [f for f in all_files if f.endswith('.js')]

print(f"Moving {len(html_files)} HTML, {len(css_files)} CSS, {len(js_files)} JS files...")

for f in html_files:
    shutil.move(os.path.join(base_dir, f), os.path.join(html_dir, f))
for f in css_files:
    shutil.move(os.path.join(base_dir, f), os.path.join(css_dir, f))
for f in js_files:
    shutil.move(os.path.join(base_dir, f), os.path.join(js_dir, f))

# 1. Update index.html at Root
index_path = os.path.join(base_dir, 'index.html')
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f: content = f.read()

    # CSS links point to css/
    content = re.sub(r'href="([^/:]+\.css)"', r'href="css/\1"', content)
    # JS src points to js/
    content = re.sub(r'src="([^/:]+\.js)"', r'src="js/\1"', content)

    # HTML routing 
    def replace_html_link_root(match):
        target = match.group(1)
        if target == 'index.html': return 'href="index.html"'
        if not target.startswith('http') and not target.startswith('html/'): 
            return f'href="html/{target}"'
        return match.group(0)

    content = re.sub(r'href="([^"]+\.html)"', replace_html_link_root, content)
    with open(index_path, 'w', encoding='utf-8') as f: f.write(content)
    print("Updated index.html safely mapping child connections.")

# 2. Update HTML pages in html/ folder
for hf in html_files:
    p = os.path.join(html_dir, hf)
    with open(p, 'r', encoding='utf-8') as f: content = f.read()

    # Link up CSS to ../css/
    content = re.sub(r'href="([^/:]+\.css)"', r'href="../css/\1"', content)
    
    # Link up Scripts to ../js/
    content = re.sub(r'src="([^/:]+\.js)"', r'src="../js/\1"', content)

    # Convert asset paths routing up
    content = re.sub(r'src="images/', r'src="../images/', content)
    content = re.sub(r'url\([\'"]?images/', r'url(\'../images/', content)

    # Fix backwards nav links to index
    content = content.replace('href="index.html"', 'href="../index.html"')

    with open(p, 'w', encoding='utf-8') as f: f.write(content)

print("Updated cross-child routing across all branched HTML pages.")

# 3. Update CSS files to point backward for relative imagery paths
for cf in css_files:
    p = os.path.join(css_dir, cf)
    with open(p, 'r', encoding='utf-8') as f: content = f.read()
    
    # URL references should bubble up
    content = re.sub(r'url\([\'"]?images/', r'url(\'../images/', content)
    
    with open(p, 'w', encoding='utf-8') as f: f.write(content)

print("Updated relative stylesheet paths.")

# 4. Patch update_html.py logic
script_path = os.path.join(base_dir, 'update_html.py')
if os.path.exists(script_path):
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write('''import os

html_dir = './html'
index_path = './index.html'

def patch_file(filepath, css_path, js_path):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    modified = False
    
    if css_path not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'    <link rel="stylesheet" href="{css_path}">\\n</head>')
            modified = True
            
    if js_path not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'    <script src="{js_path}"></script>\\n</body>')
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

if os.path.exists(index_path):
    patch_file(index_path, 'css/global.css', 'js/global.js')

if os.path.exists(html_dir):
    for filename in os.listdir(html_dir):
        if filename.endswith('.html'):
            patch_file(os.path.join(html_dir, filename), '../css/global.css', '../js/global.js')
''')
    print("Re-structured python builder script.")
    
print("DIRECTORY REORGANIZATION COMPLETE 🚀")
