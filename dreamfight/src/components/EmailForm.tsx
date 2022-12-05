import React from "react";

export function EmailForm() {
  return (
    <div
      className="email-form"
      dangerouslySetInnerHTML={{
        __html: `
          <div id="mc_embed_signup">
            <form action="https://dreamfight.us12.list-manage.com/subscribe/post?u=a735595d65f2b9f11427afb2b&amp;id=1f4100463b&amp;f_id=00fdb4e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self">
              <div id="mc_embed_signup_scroll">
                <div class="mc-field-group">
                  <div class="mc-field-with-button">
                    <input type="email" placeholder="Enter email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required />
                    <input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button" />
                  </div>
                </div>

                <div id="mce-responses" class="clear">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>

                <!-- anti spam -->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a735595d65f2b9f11427afb2b_1f4100463b" tabindex="-1" value=""></div>
              </div>
            </form>
          </div>
        `,
      }}
    />
  );
}
