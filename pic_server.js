if (Meteor.isClient) {

    Session.setDefault('tip', 'drag and drop here');

    Uploader.finished = function(index, fileInfo, templateContext) {
        var tip = '已上传：' +
            '![](' + fileInfo.url + ')';

        Session.set('tip', tip);
    };

    Template.home.helpers({
        tip: function() {

            // 如果只是修改一个变量，helper 是不会变的，session 会变
            return Session.get('tip');
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {

        UploadServer.init({
            acceptFileTypes: /.(gif|jpe?g|png)$/i,
            tmpDir: '/tmp/pic_server/uploads',
            uploadDir: process.env.PWD + '/.uploads/',
            checkCreateDirectories: true,
            finished: function(fileInfo, formFields) {
                // name String  File name
                // size Number  Size in Bytes
                // type String  MIME file type (e.g. 'text/html')
                // path String  Path relative to upload directory
                // url  String  Full url to the uploaded file
                console.log(fileInfo);

                // perform a disk operation
            },
            cacheTime: 100,
            mimeTypes: {
                "xml": "application/xml",
                "vcf": "text/x-vcard"
            }
        });

    });
}
