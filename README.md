# irac-p4-test-ivoox

Small test about an iVoox API to show how it does work.

It saves the audio file of a podcast given a search string. It allows you to
select the file from the result of the search string.

To prepare execution on Ubuntu follow steps:

```
sudo apt-get nodejs
git clone https://github.com/frnjjq/irac-p4-test-ivoox.git
npm init

```

Once you have it installed launch as:
```
nodejs -i 'Lo que quieres buscar' -o pathtothefolder

// For example
nodejs -i 'La Vida Moderna' -o ~/podcasts

```

Or if you are just a teacher that want to have a look at the program you can just run:

```
mkdir testresult

//Example 1
npm run-script run1
// Example 2
npm run-script run2

```
